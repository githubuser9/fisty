from models import Category, Article
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'title', )


class ArticleSerializer(serializers.ModelSerializer):
    #category = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Article
        ordering = ['date_created', ]
        fields = ('id', 'category', 'title', 'date_created', 'date_last_modified', 'slug', 'image', 'preview', )


class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.RelatedField(many=True)

    class Meta:
        model = Article
        fields = ('id', 'category', 'title', 'date_created', 'date_last_modified', 'slug', 'image', 'tags', 'content', )


class SearchSerializer(serializers.ModelSerializer):
    tags = serializers.RelatedField(many=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'date_created', 'slug', 'tags', )

