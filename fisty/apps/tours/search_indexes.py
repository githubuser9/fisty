import datetime
from haystack import indexes
from models import Article


class ArticleIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    date_created = indexes.DateTimeField(model_attr='date_created')
    date_last_modified = indexes.DateTimeField(model_attr='date_last_modified')
    preview = indexes.CharField(model_attr='preview')
    content = indexes.CharField(model_attr='content')
    slug = indexes.CharField(model_attr='slug')

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(date_created__lte=datetime.datetime.now())
