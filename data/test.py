from rasa_core.agent import Agent
from rasa_core.interpreter import RasaNLUInterpreter
import time

interpreter = RasaNLUInterpreter('models/current/nlu')
messages = ["Hi! you can chat in this window. Type 'stop' to end the conversation."]
agent = Agent.load('models/dialogue', interpreter=interpreter)

print("I am bot for you")
while True:
    time.sleep(0.3)
    a = input()
    if a == 'stop':
        break
    responses = agent.handle_message(a)
    for r in responses:
        res = r.get("text")
        if res:
            res = ">" + res
            print(res)