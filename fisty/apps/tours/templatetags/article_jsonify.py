import collections
from django.template import Library
from django.utils.safestring import mark_safe
from rest_framework.renderers import JSONRenderer
from fisty.apps.tours.models import Article
from fisty.apps.tours.serializers import SearchSerializer


register = Library()


def article_jsonify(object):
    if isinstance(object, collections.Iterable):
        many = True
        ids = [obj.object.id for obj in object]
    else:
        many = False
        ids = [object.id]

    articles = Article.objects.filter(pk__in=ids)
    serializer = SearchSerializer(articles, many=many)
    content = JSONRenderer().render(serializer.data)
    return mark_safe(content)

register.filter('article_jsonify', article_jsonify)