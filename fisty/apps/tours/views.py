from django.shortcuts import render_to_response
from models import Category, Article
from rest_framework import viewsets, generics
from serializers import CategorySerializer, ArticleSerializer, ArticleDetailSerializer, SearchSerializer
from django.views.generic import TemplateView
from haystack.views import SearchView


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()

        title = self.request.QUERY_PARAMS.get('title', None)

        if title is not None:
            queryset = Article.objects.all()
            queryset = queryset.filter(category__title=title)
            self.serializer_class = SearchSerializer

        return queryset


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()

        pk = self.request.QUERY_PARAMS.get('id', None)

        if pk is not None:
            self.serializer_class = ArticleDetailSerializer
            queryset = queryset.filter(pk=pk)
            return queryset

        slug = self.request.QUERY_PARAMS.get('slug', None)

        if slug is not None:
            self.serializer_class = ArticleDetailSerializer
            queryset = queryset.filter(slug=slug)

        return queryset


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = SearchSerializer

    def get_queryset(self):
        queryset = Article.objects.all()

        tag = self.request.QUERY_PARAMS.get('name', None)

        if tag is not None:
            queryset = queryset.filter(tags__name=tag)
            if len(queryset) == 1:
                self.serializer_class = ArticleDetailSerializer

        return queryset


class PartialGroupView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(PartialGroupView, self).get_context_data(**kwargs)

        return context


def index(request):

    tags = Article.tags.most_common()
    tags_len = len(tags)
    tags_step = int(round(tags_len/10 + 0.5))
    tags_dict = {}

    num = 1
    for i in range(tags_len):
        tags_dict.update({tags[i]: num})
        if not i % tags_step:
            num += 1

    return render_to_response('index.html',
                              {'tags': tags_dict, })
