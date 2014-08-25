from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from apps.tours import views
import settings

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'articles', views.ArticleViewSet)
router.register(r'tags', views.TagViewSet)



partial_patterns = patterns('',

                            url(r'^main.html$',
                                views.PartialGroupView.as_view(template_name='partials/main.html'),
                                name='main'),

                            url(r'^details.html$',
                                views.PartialGroupView.as_view(template_name='partials/details.html'),
                                name='details'),

                            url(r'^tags.html$',
                                views.PartialGroupView.as_view(template_name='partials/tags.html'),
                                name='tags'),

                            url(r'^search.html$',
                                views.PartialGroupView.as_view(template_name='partials/search.html'),
                                name='search'),

                            url(r'^categories-list.html$',
                                views.PartialGroupView.as_view(template_name='partials/categories-list.html'),
                                name='categories-list'),

                            url(r'^categories-detail.html$',
                                views.PartialGroupView.as_view(template_name='partials/categories-detail.html'),
                                name='categories-detail'),

                            url(r'^about.html$',
                                views.PartialGroupView.as_view(template_name='partials/about.html'),
                                name='about'),

                            url(r'^feedback.html$',
                                views.PartialGroupView.as_view(template_name='partials/feedback.html'),
                                name='feedback'),

)


urlpatterns = patterns('',

                       (r'^$', 'fisty.apps.tours.views.index'),

                       (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                           'document_root': settings.MEDIA_ROOT
                       }),

                       (r'^summernote/', include('django_summernote.urls')),

                       (r'^search/', include('haystack.urls')),

                       url(r'^api/', include(router.urls)),

                       url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

                       url(r'^admin/', include(admin.site.urls)),

                       url(r'^djangular/', include('djangular.urls')),

                       url(r'^partials/', include(partial_patterns, namespace='partials')),


)

