import random
from django import template

register = template.Library()


@register.filter
def shuffle_list(arg):
    tmp = list(arg[:])
    random.shuffle(tmp)
    return tmp


@register.filter
def shuffle_dict(arg):
    tmp = list(arg.keys())
    random.shuffle(tmp)
    return [(key, arg[key]) for key in tmp]
