from django.conf.urls import include, url
from .views import *



urlpatterns = [
    # Examples:
    # url(r'^$', 'funcao.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^home$', home , name='home'),
    url(r'^funcao1$', funcao1 , name='funcao1'),
    url(r'^cadastro$', registrar , name='registro'),

]
