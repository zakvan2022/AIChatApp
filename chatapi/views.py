from django.shortcuts import render
from django.http import JsonResponse

from rasa_core.agent import Agent
from rasa_core.interpreter import RasaNLUInterpreter
import time

interpreter = RasaNLUInterpreter('data/models/current/nlu')
myagent = Agent.load('data/models/dialogue', interpreter=interpreter)
# Create your views here.
def respond(request):
    query = request.GET['query']
    responses = myagent.handle_message(query)
    time.sleep(2)
    return JsonResponse({"answers":responses})

def test(request):
    return render(request, 'test/index.html')