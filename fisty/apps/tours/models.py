from django.db import models
from fisty.settings import uploaded_filepath
from taggit.managers import TaggableManager


class Category(models.Model):
    title = models.CharField(max_length=56)

    def __unicode__(self):
        return self.title


class Article(models.Model):
    title = models.CharField(max_length=128)
    slug = models.SlugField(unique=True, db_index=True)
    image = models.ImageField(upload_to=uploaded_filepath, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_last_modified = models.DateTimeField(auto_now=True)
    preview = models.TextField(null=True)
    content = models.TextField()
    category = models.ForeignKey(Category)
    tags = TaggableManager()

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ['-date_created']


