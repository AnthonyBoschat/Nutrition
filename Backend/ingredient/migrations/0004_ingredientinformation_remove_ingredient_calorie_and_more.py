# Generated by Django 5.1 on 2024-08-25 09:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0003_remove_ingredient_informations_ingredient_calorie_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='IngredientInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calorie', models.IntegerField(default=0)),
                ('weight', models.IntegerField(default=0)),
                ('protein', models.FloatField(default=0)),
                ('glucid', models.FloatField(default=0)),
                ('lipid', models.FloatField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='calorie',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='glucid',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='lipid',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='protein',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='weight',
        ),
        migrations.AddField(
            model_name='ingredient',
            name='informations',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredientinformation'),
            preserve_default=False,
        ),
    ]
