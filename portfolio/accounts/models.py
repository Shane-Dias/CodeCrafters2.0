from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone_number, address, bank_account, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number, address=address, bank_account=bank_account)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number, address, bank_account, password=None):
        user = self.create_user(email, phone_number, address, bank_account, password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    bank_account = models.CharField(max_length=30, unique=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # Fix for SystemCheckError
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",  # Avoid conflict with default User model
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",  # Avoid conflict
        blank=True
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'address', 'bank_account']

    def __str__(self):
        return self.email
