from django.contrib import admin
from models import Category, Article
from django_summernote.admin import SummernoteModelAdmin


class ArticleModelAdmin(SummernoteModelAdmin):
    prepopulated_fields = {'slug': ('title', )}


admin.site.register(Category)
admin.site.register(Article, ArticleModelAdmin)

