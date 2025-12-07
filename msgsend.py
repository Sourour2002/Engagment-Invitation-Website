import pywhatkit
import time

# contacts = [
#     {"name": "Boda", "phone": "+201113665435"},
#     {"name": "Basoma", "phone": "+201020399655"},
#     {"name": "Baskota", "phone": "+201007484376"},
#     {"name": "Body", "phone": "+201200030636"},
#     {"name": "Basbosa", "phone": "+201552407599"},
#     {"name": "Auntie Tuqa", "phone": "+201152054440"},
#     {"name": "Dai", "phone": "+201123652048"},
#     {"name": "Ebo / Sou", "phone": "+201029244399"},
#     {"name": "Ghada", "phone": "+201154335997"},
#     {"name": "Habiba Hossam", "phone": "+201159612394"},
#     {"name": "Habiba Waleed", "phone": "+201149552698"},
#     {"name": "Neno", "phone": "+201028943912"},
#     {"name": "Auntie Mohga", "phone": "+201000045767"},
#     {"name": "Janjuna", "phone": "+201025131342"},
#     {"name": "Logy", "phone": "+201153071096"},
#     {"name": "Maloka", "phone": "+201145659338"},
#     {"name": "Mariam", "phone": "+201003634567"},
#     {"name": "Mariam Alaa", "phone": "+201066111738"},
#     {"name": "Marwan", "phone": "+201022830506"},
#     {"name": "Mo'men", "phone": "+201096586685"},
#     {"name": "Nadosha", "phone": "+201102018116"},
#     {"name": "Osama", "phone": "+201020452779"},
#     {"name": "Rana", "phone": "+201119642665"},
#     {"name": "Reem", "phone": "+201060577975"},
#     {"name": "Mariam (0127)", "phone": "+201270921590"},
#     {"name": "Salma", "phone": "+201552552466"},
#     {"name": "Sonson", "phone": "+201276435511"},
#     {"name": "Shabora", "phone": "+201010088373"},
#     {"name": "Tafnes", "phone": "+201277474621"},
#     {"name": "Auntie Eman", "phone": "+201115016699"},
#     {"name": "Auntie Enas", "phone": "+201225211910"},
#     {"name": "Auntie Hoda", "phone": "+201008927334"},
#     {"name": "Auntie Rehab", "phone": "+201098176500"},
#     {"name": "Yasmeen", "phone": "+201113879324"},
#     {"name": "Joe", "phone": "+201014675322"},
#     {"name": "Alaa", "phone": "+201150142548"},
#     {"name": "Samasemo", "phone": "+201007607456"},
#     {"name": "Auntie Doaa", "phone": "+201142337331"},
#     {"name": "Mameto", "phone": "+201014518351"},
# ]

contacts = [
    {"name": "Sourour", "phone": "+201143751086"},
    {"name": "Sourour2", "phone": "+201142367122"}
]

# Message template
message_template = "Hi {name}, check this link: https://example.com/user/{name}"

for contact in contacts:
    name = contact["name"]
    phone = contact["phone"]
    
    message = message_template.format(name=name)
    
    # Send message instantly
    pywhatkit.sendwhatmsg_instantly(phone, message, wait_time=10, tab_close=True)
    
    # Small delay to avoid issues
    time.sleep(5)

print("All messages sent!")