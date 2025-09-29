import { useState, useEffect } from "react";
import styles from "./ProfileForm.module.scss";

interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  bitrix_contact_id?: number;
}

interface ProfileFormProps {
  user: User;
  onUpdate: (data: Partial<User>) => Promise<boolean>;
}

const BITRIX_URL = "https://your-company.bitrix24.ru/rest/1/webhook-code";

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
  name: user.name || "",
  email: user.email || "",
  phone: user.phone || "",
  address: user.address || "",
});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [initialData, setInitialData] = useState({ ...formData });

useEffect(() => {
  const newData = {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  };
  setFormData(newData);
  setInitialData(newData);
}, [user]);


  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Имя обязательно";
        if (value.trim().length < 2) return "Имя должно содержать минимум 2 символа";
        break;
      case "email":
        if (!value.trim()) return "Email обязателен";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Введите корректный email";
        break;
      case "phone":
        if (!value.trim()) return "Телефон обязателен";
        if (!/^\+?[\d\s\-\(\)]+$/.test(value)) return "Введите корректный номер телефона";
        break;
      case "address":
        if (!value.trim()) return "Адрес обязателен";
        break;
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, (formData as any)[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (isEditing) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const isFormValid = (): boolean => {
    if (!isEditing) return true;
    
    return Object.keys(formData).every(key => 
      (formData as any)[key]?.trim() && !validateField(key, (formData as any)[key])
    );
  };

  const hasChanges = (): boolean => {
    return Object.keys(formData).some(key => 
      (formData as any)[key] !== (initialData as any)[key]
    );
  };

  const updateBitrixContact = async (contactData: Partial<User>): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Bitrix update error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);

    try {
      const bitrixSuccess = await updateBitrixContact(formData);
      
      if (!bitrixSuccess) {
        throw new Error('Ошибка обновления в Битрикс24');
      }

      const dbSuccess = await onUpdate(formData);
      
      if (dbSuccess) {
        setSuccessMessage('Данные успешно обновлены');
        setInitialData({ ...formData });
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Ошибка обновления в базе данных');
      }
    } catch (error) {
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Произошла ошибка при обновлении' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialData });
    setErrors({});
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.line}></span>Профиль
        </h2>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {getInitials(formData.name)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.profileInfo}>
            {[
              { key: "name", label: "Имя" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Телефон" },
              { key: "address", label: "Адрес" }
            ].map(({ key, label }) => (
              <div key={key} className={styles.infoRow}>
                <span className={styles.label}>{label}</span>
                {isEditing ? (
                  <input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    // disabled={!isEditing}
                    className={styles.inputField}
                  />
                ) : (
                  <span className={styles.value}>{(formData as any)[key]}</span>
                )}
                {errors[key] && <span className={styles.errorText}>{errors[key]}</span>}
              </div>
            ))}
          </div>

          {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

          <div className={styles.actions}>
            {!isEditing ? (
             <button
  type="button"
  onClick={() => setIsEditing(true)}
  className={styles.editButton}
>
  Редактировать
</button>

            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className={styles.cancelButton}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid() || isLoading || !hasChanges()}
                  className={styles.saveButton}
                >
                  {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;