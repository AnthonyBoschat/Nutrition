# Generated by Django 5.1 on 2024-08-25 09:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0004_ingredientinformation_remove_ingredient_calorie_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='informations',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ingredient', to='ingredient.ingredientinformation'),
        ),
    ]
