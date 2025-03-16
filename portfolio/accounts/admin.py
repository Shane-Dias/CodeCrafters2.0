from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, StockPurchase

class CustomUserAdmin(UserAdmin):
    list_display = ("email", "phone_number", "address", "bank_account","wallet",'total_profit', 'total_investments' ,"is_staff", "is_active")
    search_fields = ("email", "phone_number")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "phone_number", "address", "bank_account", "password", "wallet", 'total_profit', 'total_investments')}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "phone_number", "address", "bank_account", "password1", "password2", "is_staff", "is_active")}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(StockPurchase)
