# Generated by Django 2.0 on 2017-12-16 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helloworld', '0006_auto_20171216_1654'),
    ]

    operations = [
        migrations.AddField(
            model_name='countriestempmaxvalue',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='countriestempmaxvalue',
            name='uMonthId',
            field=models.IntegerField(),
        ),
    ]
