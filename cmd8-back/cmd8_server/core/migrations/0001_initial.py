# Generated by Django 4.2 on 2023-04-03 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AiTool',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('imgUrl', models.CharField(max_length=255)),
                ('ko', models.JSONField()),
                ('en', models.JSONField()),
            ],
            options={
                'db_table': 'tb_aitool',
                'abstract': False,
                'managed': True,
            },
        ),
    ]