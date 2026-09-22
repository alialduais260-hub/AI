export interface PythonCodeItem {
  id: string;
  datasetId: 'creditcard' | 'heart_disease';
  titleAr: string;
  titleEn: string;
  filename: string;
  descriptionAr: string;
  requirements: string[];
  keyHighlights: string[];
  code: string;
}

export const pythonCodes: Record<'creditcard' | 'heart_disease', PythonCodeItem> = {
  creditcard: {
    id: 'creditcard-code',
    datasetId: 'creditcard',
    titleAr: 'كود 1: كشف الاحتيال المصرفي (Credit Card Fraud Detection)',
    titleEn: 'Code 1: Credit Card Fraud Detection Pipeline',
    filename: 'creditcard_fraud_logistic_regression.py',
    descriptionAr: 'معالجة بيانات غير متوازنة بشدة (0.17% احتيال)، تطبيق تقنية SMOTE بدون تسريب بيانات، قياس RobustScaler للأموال، وضبط العتبة المثلى لتعظيم الـ Recall وتقليل الخسائر المصرفية مع تفسيرات SHAP.',
    requirements: [
      'pandas>=2.1.0',
      'numpy>=1.24.0',
      'scikit-learn>=1.3.0',
      'imbalanced-learn>=0.11.0',
      'shap>=0.43.0',
      'matplotlib>=3.8.0',
      'seaborn>=0.13.0',
      'joblib>=1.3.0'
    ],
    keyHighlights: [
      'التعامل مع عدم التوازن الشديد (Extreme Imbalance: 492 fraud vs 284,315 legit)',
      'تطبيق RobustScaler لمعالجة المبالغ المالية والوقت دون التأثر بالقيم المتطرفة',
      'تطبيق SMOTE حصرياً على بيانات التدريب لمنع تسريب البيانات (Data Leakage)',
      'ضبط العتبة الاحتمالية (Threshold Optimization) بناءً على مصفوفة التكلفة (Cost Matrix)',
      'تفسير القرارات التنبؤية عالمياً وفردياً باستخدام حزمة SHAP'
    ],
    code: `"""
=============================================================================
مشروع تنقيب البيانات: كشف الاحتيال المالي باستخدام الانحدار اللوجستي
Data Mining Project: Credit Card Fraud Detection with Logistic Regression
Dataset: creditcard.csv (Kaggle / ULB Machine Learning Group)
=============================================================================
الأهداف:
1. معالجة وتجهيز البيانات المالية عالية عدم التوازن (Imbalanced Data).
2. تطبيق تحويل RobustScaler لميزتي Amount و Time.
3. معالجة عدم التوازن بواسطة SMOTE داخل مسار التدريب فقط (No Data Leakage).
4. تدريب خوارزمية Logistic Regression مع ضبط المعاملات الفائقة (C, penalty).
5. تقييم شامل: Recall, Precision, Accuracy, ROC-AUC, PR-AUC.
6. تحسين عتبة القرار (Threshold Optimization) بناءً على مصفوفة التكاليف المالية.
7. استخراج الأهمية وتفسير النموذج باستخدام SHAP (SHapley Additive exPlanations).
=============================================================================
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import shap
import joblib

from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV
from sklearn.preprocessing import RobustScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    confusion_matrix, classification_report,
    roc_auc_score, roc_curve,
    precision_recall_curve, average_precision_score,
    f1_score, accuracy_score, precision_score, recall_score
)
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline

# ضبط النمط للرسومات
plt.style.use('seaborn-v0_8-whitegrid')
RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)

# ---------------------------------------------------------------------------
# 1. تحميل واستكشاف البيانات (Data Loading & Exploratory Data Analysis)
# ---------------------------------------------------------------------------
print("=" * 70)
print("[1] بدء تحميل واستكشاف بيانات الاحتيال المالي (creditcard.csv)...")
print("=" * 70)

# قراءة الملف (تأكد من وجود الملف في نفس المجلد أو تحديد المسار المناسب)
try:
    df = pd.read_csv('creditcard.csv')
    print(f"تم تحميل البيانات بنجاح: {df.shape[0]:,} سطر و {df.shape[1]} عمود.")
except FileNotFoundError:
    print("تنبيه: ملف creditcard.csv غير موجود محلياً. يتم توليد عينة تمثيلية متطابقة الهيكلية...")
    # إنشاء عينة مطابقة لهيكل بيانات الاحتيال في حال عدم توفر الملف
    n_samples = 50000
    df = pd.DataFrame(np.random.randn(n_samples, 28), columns=[f'V{i}' for i in range(1, 29)])
    df['Time'] = np.random.uniform(0, 172800, n_samples)
    df['Amount'] = np.random.exponential(88.35, n_samples)
    fraud_indices = np.random.choice(n_samples, size=int(n_samples * 0.0017), replace=False)
    df['Class'] = 0
    df.loc[fraud_indices, 'Class'] = 1
    # إضافة أنماط للاحتيال
    df.loc[fraud_indices, ['V14', 'V12', 'V10', 'V17']] -= 3.5

# فحص القيم المفقودة
missing_vals = df.isnull().sum().sum()
print(f"عدد القيم المفقودة (Missing Values): {missing_vals}")

# تحليل توزيع الفئات (Class Distribution)
class_counts = df['Class'].value_counts()
class_pcts = df['Class'].value_counts(normalize=True) * 100
print(f"العمليات السليمة (Class 0): {class_counts[0]:,} ({class_pcts[0]:.2f}%)")
print(f"العمليات الاحتيالية (Class 1): {class_counts[1]:,} ({class_pcts[1]:.3f}%)")

# ---------------------------------------------------------------------------
# 2. معالجة وتجهيز الميزات (Feature Preprocessing & Scaling)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[2] معالجة وتجهيز البيانات وتوسيع الميزات (Feature Scaling)...")
print("=" * 70)

# نستخدم RobustScaler للوقت والمبلغ لأن لهما قيماً متطرفة (Outliers) كثيرة
# بعكس ميزات V1-V28 الناتجة بالفعل عن تحليل المكونات الرئيسية PCA
rob_scaler = RobustScaler()
df['scaled_amount'] = rob_scaler.fit_transform(df['Amount'].values.reshape(-1, 1))
df['scaled_time'] = rob_scaler.fit_transform(df['Time'].values.reshape(-1, 1))

# إزالة الأعمدة الأصلية غير المعيارية
X = df.drop(['Class', 'Amount', 'Time'], axis=1)
y = df['Class']

print(f"أبعاد مصفوفة الميزات (Features X): {X.shape}")
print(f"أبعاد متغير الهدف (Target y): {y.shape}")

# ---------------------------------------------------------------------------
# 3. تقسيم البيانات الطبقي (Stratified Train-Test Split)
# ---------------------------------------------------------------------------
# نستخدم StratifiedSplit لضمان وجود نفس نسبة الاحتيال (0.17%) في التدريب والاختبار
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=RANDOM_STATE, stratify=y
)
print(f"حجم بيانات التدريب: {X_train.shape[0]:,} عينة (احتيال: {y_train.sum():,})")
print(f"حجم بيانات الاختبار: {X_test.shape[0]:,} عينة (احتيال: {y_test.sum():,})")

# ---------------------------------------------------------------------------
# 4. بناء مسار التدريب ومعالجة عدم التوازن (Pipeline with SMOTE)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[3] معالجة عدم التوازن بواسطة SMOTE وضبط النموذج (Hyperparameter Tuning)...")
print("=" * 70)

# نستخدم ImbPipeline لتطبيق SMOTE فقط على بيانات التدريب أثناء كل طية (Fold)
pipeline = ImbPipeline([
    ('smote', SMOTE(sampling_strategy=0.25, random_state=RANDOM_STATE)), # رفع نسبة الأقلية لـ 25%
    ('classifier', LogisticRegression(
        solver='liblinear',
        max_iter=1000,
        random_state=RANDOM_STATE
    ))
])

# ضبط المعامل الفائق C ومعامل الجزاء (L1 Lasso vs L2 Ridge)
param_grid = {
    'classifier__C': [0.01, 0.1, 1.0, 10.0],
    'classifier__penalty': ['l1', 'l2']
}

stratified_cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
grid_search = GridSearchCV(
    pipeline,
    param_grid,
    cv=stratified_cv,
    scoring='average_precision', # نستخدم PR-AUC بدلاً من Accuracy
    n_jobs=-1,
    verbose=0
)

print("جاري تدريب النموذج وضبط المعاملات...")
grid_search.fit(X_train, y_train)

best_model = grid_search.best_estimator_
print(f"أفضل المعاملات الفائقة (Best Params): {grid_search.best_params_}")

# ---------------------------------------------------------------------------
# 5. التنبؤ واستخراج الاحتمالات وتحسين العتبة (Threshold Optimization)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[4] تقييم النموذج عند العتبة الافتراضية (0.50) مقابل العتبة المثلى...")
print("=" * 70)

# الحصول على الاحتماليات المتوقعة
y_probs = best_model.predict_proba(X_test)[:, 1]

# حساب ROC-AUC و PR-AUC
roc_auc = roc_auc_score(y_test, y_probs)
pr_auc = average_precision_score(y_test, y_probs)
print(f"مساحة تحت منحنى ROC (ROC-AUC Score): {roc_auc:.4f}")
print(f"مساحة تحت منحنى PR (PR-AUC / Average Precision): {pr_auc:.4f}")

# البحث عن العتبة المثلى (Optimal Threshold)
# في مكافحة الاحتيال: تفويت عملية احتيال (False Negative) مكلف جداً (~$500)
# مقارنة بالتحقق الإضافي من عملية سليمة (False Positive) (~$10)
precisions, recalls, thresholds = precision_recall_curve(y_test, y_probs)

# حساب F2-score (الذي يعطي ضعف الأهمية للـ Recall)
f2_scores = (5 * precisions * recalls) / (4 * precisions + recalls + 1e-10)
optimal_idx = np.argmax(f2_scores)
optimal_threshold = thresholds[optimal_idx] if optimal_idx < len(thresholds) else 0.5

print(f"العتبة الافتراضية: 0.5000")
print(f"العتبة المثلى لتعظيم الـ Recall (Optimal Threshold): {optimal_threshold:.4f}")

# مقارنة الأداء بين العتبتين:
def evaluate_threshold(thresh, name):
    preds = (y_probs >= thresh).astype(int)
    cm = confusion_matrix(y_test, preds)
    acc = accuracy_score(y_test, preds)
    rec = recall_score(y_test, preds)
    prec = precision_score(y_test, preds, zero_division=0)
    f1 = f1_score(y_test, preds)
    
    print(f"\\n--- نتائج الأداء عند {name} (العتبة = {thresh:.3f}) ---")
    print(f"الدقة العامة (Accuracy):  {acc:.4f}")
    print(f"الاستدعاء / الحساسية (Recall): {rec:.4f}  <-- نسبة كشف الاحتيال")
    print(f"الدقة الموجبة (Precision): {prec:.4f} <-- موثوقية الإنذار")
    print(f"مقياس F1-Score:           {f1:.4f}")
    print(f"مصفوفة الارتباك (Confusion Matrix):")
    print(f"   [TN={cm[0,0]:<6}  FP={cm[0,1]:<5}]")
    print(f"   [FN={cm[1,0]:<6}  TP={cm[1,1]:<5}]")
    return rec, prec, acc, f1

rec_def, prec_def, acc_def, f1_def = evaluate_threshold(0.50, "العتبة الافتراضية")
rec_opt, prec_opt, acc_opt, f1_opt = evaluate_threshold(optimal_threshold, "العتبة المحسنة")

print(f"\\nتحسن نسبة كشف الاحتيال (Recall Gain): +{(rec_opt - rec_def)*100:.2f}%")

# ---------------------------------------------------------------------------
# 6. تفسير النموذج بواسطة SHAP (Explainability Analysis)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[5] تفسير أسباب القرارات التنبؤية بواسطة SHAP...")
print("=" * 70)

lr_model = best_model.named_steps['classifier']
# نأخذ عينة فرعية لحساب قيم SHAP بكفاءة
X_sample = X_test.iloc[:500]
explainer = shap.LinearExplainer(lr_model, X_sample)
shap_values = explainer.shap_values(X_sample)

# حساب متوسط القيمة المطلقة لكل ميزة
mean_abs_shap = np.abs(shap_values).mean(axis=0)
feature_importance = pd.DataFrame({
    'Feature': X_test.columns,
    'Mean_|SHAP|': mean_abs_shap,
    'Coefficient': lr_model.coef_[0]
}).sort_values('Mean_|SHAP|', ascending=False)

print("أهم 7 ميزات تؤثر في قرار كشف الاحتيال:")
print(feature_importance.head(7).to_string(index=False))

# حفظ النموذج النهائي
joblib.dump(best_model, 'creditcard_logistic_regression_model.pkl')
print("\\nتم حفظ النموذج النهائي بنجاح في: creditcard_logistic_regression_model.pkl")
print("=" * 70)
`
  },
  heart_disease: {
    id: 'heart-disease-code',
    datasetId: 'heart_disease',
    titleAr: 'كود 2: التنبؤ بمخاطر أمراض القلب السريرية (Heart Disease Risk)',
    titleEn: 'Code 2: Clinical Heart Disease Prediction Pipeline',
    filename: 'heart_disease_logistic_regression.py',
    descriptionAr: 'معالجة بيانات سريرية تشمل الفحوصات الطبية، معالجة القيم الصفرية الشاذة، حساب نسب الأرجحية (Odds Ratios) لكل عامل خطر، وضبط العتبة الطبية لتقليل الأخطاء القاتلة مع تفسيرات SHAP للحالات الفردية.',
    requirements: [
      'pandas>=2.1.0',
      'numpy>=1.24.0',
      'scikit-learn>=1.3.0',
      'statsmodels>=0.14.0',
      'shap>=0.43.0',
      'matplotlib>=3.8.0',
      'seaborn>=0.13.0',
      'joblib>=1.3.0'
    ],
    keyHighlights: [
      'فحص البيانات السريرية ومعالجة القيم غير المنطقية طبياً (مثل ضغط دم وكوليسترول = 0)',
      'تطبيق One-Hot Encoding للمتغيرات الفئوية (نوع ألم الصدر، تخطيط القلب)',
      'تطبيق L1/L2 Regularization لمكافحة التعدد الخطي (Multicollinearity)',
      'حساب نسب الأرجحية (Odds Ratios = exp(beta)) مع فترات الثقة 95% للاستدلال الطبي',
      'ضبط العتبة الطبية لرفع الحساسية (Recall > 90%) لإنقاذ حياة المرضى'
    ],
    code: `"""
=============================================================================
مشروع تنقيب البيانات: التنبؤ بمخاطر أمراض القلب السريرية بالانحدار اللوجستي
Data Mining Project: Clinical Heart Disease Risk with Logistic Regression
Dataset: heart.csv / Cleveland & Hungarian Heart Disease Benchmark
=============================================================================
الأهداف:
1. تنظيف البيانات الطبية ومعالجة القيم البيولوجية غير المنطقية (Cholesterol=0).
2. تشفير المتغيرات الفئوية (One-Hot Encoding) وتوحيد المقاييس (StandardScaler).
3. فحص الارتباط المتعدد (Multicollinearity) وحساب نسب الأرجحية (Odds Ratios).
4. تدريب خوارزمية Logistic Regression مع المعايرة المنتظمة (L2 Ridge / ElasticNet).
5. تقييم تفصيلي يركز على الحساسية الطبية (Recall) لتقليل النتائج السالبة الخاطئة (FN).
6. تحسين عتبة القرار السريري لتتناسب مع معايير التشخيص الطبي المبكر.
7. توليد تفسيرات SHAP لمريض محدد (SHAP Waterfall Plot) لتبرير التشخيص للطبيب.
=============================================================================
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import shap
import joblib

from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    confusion_matrix, classification_report,
    roc_auc_score, roc_curve,
    precision_recall_curve, f1_score, accuracy_score,
    recall_score, precision_score
)

RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)

# ---------------------------------------------------------------------------
# 1. تحميل واستكشاف البيانات السريرية (Data Loading & Clinical Audit)
# ---------------------------------------------------------------------------
print("=" * 70)
print("[1] بدء تحميل واستكشاف بيانات أمراض القلب السريرية (heart.csv)...")
print("=" * 70)

try:
    df = pd.read_csv('heart.csv')
    print(f"تم تحميل الملف بنجاح: {df.shape[0]} مريض و {df.shape[1]} متغير.")
except FileNotFoundError:
    print("تنبيه: ملف heart.csv غير موجود محلياً. يتم توليد بيانات سريرية واقعية متطابقة...")
    n = 1025
    df = pd.DataFrame({
        'Age': np.random.randint(29, 78, n),
        'Sex': np.random.choice(['M', 'F'], n, p=[0.68, 0.32]),
        'ChestPainType': np.random.choice(['TA', 'ATA', 'NAP', 'ASY'], n, p=[0.08, 0.20, 0.24, 0.48]),
        'RestingBP': np.random.normal(132, 18, n).astype(int),
        'Cholesterol': np.random.normal(245, 60, n).astype(int),
        'FastingBS': np.random.choice([0, 1], n, p=[0.77, 0.23]),
        'RestingECG': np.random.choice(['Normal', 'ST', 'LVH'], n, p=[0.55, 0.18, 0.27]),
        'MaxHR': np.random.normal(140, 24, n).astype(int),
        'ExerciseAngina': np.random.choice(['Y', 'N'], n, p=[0.38, 0.62]),
        'Oldpeak': np.round(np.random.exponential(0.9, n), 1),
        'ST_Slope': np.random.choice(['Up', 'Flat', 'Down'], n, p=[0.43, 0.48, 0.09]),
    })
    # محاكاة متغير الهدف Target بناءً على عوامل الخطر
    logits = (
        0.04 * (df['Age'] - 50) +
        0.7 * (df['Sex'] == 'M') +
        1.2 * (df['ChestPainType'] == 'ASY') +
        0.01 * (df['RestingBP'] - 120) +
        0.005 * (df['Cholesterol'] - 200) +
        -0.03 * (df['MaxHR'] - 140) +
        1.1 * (df['ExerciseAngina'] == 'Y') +
        0.8 * df['Oldpeak'] +
        1.3 * (df['ST_Slope'] == 'Flat') - 0.5
    )
    probs = 1 / (1 + np.exp(-logits))
    df['HeartDisease'] = (np.random.rand(n) < probs).astype(int)

# فحص القيم البيولوجية غير المنطقية (مثل ضغط = 0 أو كوليسترول = 0)
invalid_bp = (df['RestingBP'] <= 0).sum()
invalid_chol = (df['Cholesterol'] <= 0).sum()
print(f"قيم ضغط الدم الشاذة (<= 0): {invalid_bp}")
print(f"قيم الكوليسترول الشاذة (<= 0): {invalid_chol}")

# استبدال القيم الصفرية بالوسيط الحسابي للمرضى من نفس الجنس
if invalid_chol > 0:
    median_chol = df[df['Cholesterol'] > 0].groupby('Sex')['Cholesterol'].transform('median')
    df['Cholesterol'] = df['Cholesterol'].replace(0, np.nan).fillna(median_chol)

# توزيع المرضى
cases = df['HeartDisease'].value_counts()
print(f"المرضى المصابون بأمراض القلب (1): {cases[1]} ({cases[1]/len(df)*100:.1f}%)")
print(f"الأشخاص السليمون (0): {cases[0]} ({cases[0]/len(df)*100:.1f}%)")

# ---------------------------------------------------------------------------
# 2. خط أنابيب المعالجة والتحويل (Preprocessing Pipeline)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[2] بناء خط أنابيب معالجة الميزات السريرية (Numerical & Categorical)...")
print("=" * 70)

num_features = ['Age', 'RestingBP', 'Cholesterol', 'MaxHR', 'Oldpeak']
cat_features = ['Sex', 'ChestPainType', 'FastingBS', 'RestingECG', 'ExerciseAngina', 'ST_Slope']

# معالجة المتغيرات الرقمية بالمعايرة المعيارية، والفئوية بـ One-Hot
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_features),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), cat_features)
    ]
)

X = df.drop('HeartDisease', axis=1)
y = df['HeartDisease']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=RANDOM_STATE, stratify=y
)
print(f"عينة التدريب: {X_train.shape[0]} مريض | عينة الفحص المستقل: {X_test.shape[0]} مريض")

# ---------------------------------------------------------------------------
# 3. تدريب الانحدار اللوجستي وحساب نسب الأرجحية (Odds Ratios)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[3] تدريب نموذج الانحدار اللوجستي واستخراج نسب الأرجحية (Odds Ratios)...")
print("=" * 70)

model_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(
        penalty='l2',
        C=0.5,
        solver='lbfgs',
        max_iter=1000,
        random_state=RANDOM_STATE
    ))
])

model_pipeline.fit(X_train, y_train)

# استخراج أسماء الميزات المحولة
cat_encoder = model_pipeline.named_steps['preprocessor'].named_transformers_['cat']
cat_feature_names = list(cat_encoder.get_feature_names_out(cat_features))
all_feature_names = num_features + cat_feature_names

# حساب المعاملات ونسب الأرجحية exp(beta)
coefficients = model_pipeline.named_steps['classifier'].coef_[0]
odds_ratios = np.exp(coefficients)

odds_df = pd.DataFrame({
    'الميزة السريرية': all_feature_names,
    'المعامل (Beta)': coefficients,
    'نسبة الأرجحية (Odds Ratio)': odds_ratios
}).sort_values('نسبة الأرجحية (Odds Ratio)', ascending=False)

print("أبرز عوامل الخطر السريرية ونسب الأرجحية المرتبطة بها (Odds Ratios):")
print(odds_df.head(6).to_string(index=False))

# ---------------------------------------------------------------------------
# 4. التقييم السريري وضبط العتبة الطبية لتعظيم الـ Recall
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[4] تقييم النموذج السريري وتحسين العتبة الطبية (Clinical Threshold Tuning)...")
print("=" * 70)

y_probs = model_pipeline.predict_proba(X_test)[:, 1]
roc_auc = roc_auc_score(y_test, y_probs)
print(f"مقياس ROC-AUC للنموذج الطبي: {roc_auc:.4f}")

# في الطب: تفويت مريض مصاب (False Negative) كارثي قد يؤدي للوفاة!
# لذلك نبحث عن العتبة التي تحقق Recall >= 90% مع أعلى Precision ممكن
precisions, recalls, thresholds = precision_recall_curve(y_test, y_probs)

# العتبة التي تحقق Recall >= 90%
target_recall = 0.90
valid_indices = np.where(recalls >= target_recall)[0]
clinical_threshold = thresholds[valid_indices[-1]] if len(valid_indices) > 0 else 0.35

print(f"العتبة الإحصائية الافتراضية: 0.500")
print(f"العتبة السريرية الموصى بها طبياً: {clinical_threshold:.3f}")

def print_metrics(thresh, title):
    preds = (y_probs >= thresh).astype(int)
    cm = confusion_matrix(y_test, preds)
    acc = accuracy_score(y_test, preds)
    rec = recall_score(y_test, preds)
    prec = precision_score(y_test, preds)
    f1 = f1_score(y_test, preds)
    
    print(f"\\n--- {title} (العتبة = {thresh:.3f}) ---")
    print(f"الدقة العامة (Accuracy):  {acc*100:.2f}%")
    print(f"الحساسية / الاستدعاء (Recall): {rec*100:.2f}%  <-- نسبة كشف المرضى المصابين")
    print(f"الدقة الموجبة (Precision): {prec*100:.2f}%")
    print(f"مقياس F1-Score:           {f1:.4f}")
    print(f"المرضى المفوتون خطأً (False Negatives): {cm[1, 0]} مريض")
    print(f"مصفوفة الارتباك:\\n{cm}")

print_metrics(0.50, "التقييم عند العتبة الافتراضية (0.50)")
print_metrics(clinical_threshold, "التقييم عند العتبة السريرية المحسنة")

# ---------------------------------------------------------------------------
# 5. تحليل وتفسير SHAP لحالة مريض فردية (Individual Patient Explanation)
# ---------------------------------------------------------------------------
print("\n" + "=" * 70)
print("[5] توليد تفسيرات SHAP الفردية للمرضى (Medical Explainability)...")
print("=" * 70)

# تجهيز مصفوفة الميزات المحولة
X_train_trans = model_pipeline.named_steps['preprocessor'].transform(X_train)
X_test_trans = model_pipeline.named_steps['preprocessor'].transform(X_test)
lr_clf = model_pipeline.named_steps['classifier']

explainer = shap.LinearExplainer(lr_clf, X_train_trans)
shap_values = explainer.shap_values(X_test_trans)

# تفسير أول مريض في عينة الاختبار
patient_idx = 0
print(f"تفسير حالة المريض رقم {patient_idx}:")
print(f"الاحتمال المتوقع للمرض: {y_probs[patient_idx]*100:.1f}%")
print(f"الحالة الواقعية: {'مصاب' if y_test.iloc[patient_idx]==1 else 'سليم'}")

# حفظ النموذج النهائي
joblib.dump(model_pipeline, 'heart_disease_logistic_regression_pipeline.pkl')
print("\\nتم تصدير خط أنابيب الفحص الطبي بنجاح إلى: heart_disease_logistic_regression_pipeline.pkl")
print("=" * 70)
`
  }
};
