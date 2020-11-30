#!/usr/bin/env python
# coding: utf-8

# In[1]:


#rating for things outside and not crowded
outside = 1
#rating for things inside
inside = 2
#rating for things where you get close to people
close = 3
#rating for things where you get close to alot of people
crowded = 4
#rating for things where you get close to alot of people and it isn't the most responsible of atmospheres
packed = 5


def generateLocWeights():
    loc_weights = {}
    loc_weights['advertising, marketing'] = inside
    loc_weights['airport'] = close
    loc_weights['amusement park, theme park'] = crowded
    loc_weights['assisted living service, assisted, assisted living, home'] = inside
    loc_weights['thletic field, sports field'] = outside
    loc_weights['bagel, donut'] = inside
    loc_weights['bar, alcohol'] = packed
    loc_weights['base, military'] = inside
    loc_weights['beach'] = outside
    loc_weights['beauty, hair, salon, barber'] = close
    loc_weights['beer, wine, spirit, alcohol, booze'] = inside
    loc_weights['bicycle, bike, cycle'] = outside
    loc_weights['boating'] = outside
    loc_weights['bookstore, book shop'] = inside
    loc_weights['bowling, bowl, bowling alley'] = inside
    loc_weights['brewery, beer'] = inside
    loc_weights['bus station, bus stop, bus'] = outside
    loc_weights['campground, rv park'] = outside
    loc_weights['candy store, candy, candies, confectionary, chocolatier, chocolate'] = inside
    loc_weights['car rental, truck rental'] = inside
    loc_weights['car wash, detail, car detail, car wax'] = outside
    loc_weights['casinos, gaming'] = inside
    loc_weights['cemetery, graveyard, mausoleum'] = outside
    loc_weights['clothing, accessories, apparel'] = inside
    loc_weights['college, university'] = inside
    loc_weights['combat sports, boxing, martial arts, fighting'] = inside
    loc_weights['computer, electronic'] = inside
    loc_weights['contractor, repair'] = inside
    loc_weights['dance'] = inside
    loc_weights['day care, preschool, daycare, child care'] = inside
    loc_weights['department store, big box store, department'] = inside
    loc_weights['dog park'] = outside
    loc_weights['drug services, alcohol services, clinic'] = outside
    loc_weights['dry cleaning, laundry, dry cleaner, laundry service, laundromat'] = inside
    loc_weights['education, school'] = inside
    loc_weights['embassy, foreign'] = inside
    loc_weights['er, emergency room'] = close
    loc_weights['fast food'] = inside
    loc_weights['fire stations, fire house, fire department'] = inside
    loc_weights['florist, flowers, flower shop'] = inside
    loc_weights['forest, woods'] = outside
    loc_weights['funeral service, funeral home'] = inside
    loc_weights['furniture, decor'] = inside
    loc_weights['garden'] = outside
    loc_weights['gas station, fuel, gas'] = outside
    loc_weights['gift, novelty'] = inside
    loc_weights['glasses, optical'] = inside
    loc_weights['government agency'] = inside
    loc_weights['gun range'] = outside
    loc_weights['home improvement, repairman, handyman, repair'] = inside
    loc_weights['hospital, clinic, medical center'] = close
    loc_weights['hotel, motel'] = inside
    loc_weights['houseware, home goods'] = inside
    loc_weights['ice cream parlor, ice cream'] = inside
    loc_weights['insurance'] = inside
    loc_weights['jewelry, watches, accessories'] = inside
    loc_weights['juice bar, smoothie, juice'] = inside
    loc_weights['lake'] = outside
    loc_weights['landmark'] = outside
    loc_weights['legal, lawyer, law, law office'] = inside
    loc_weights['lodging'] = inside
    loc_weights['massage, masseuse'] = close
    loc_weights['meat, seafood, butcher, deli'] = inside
    loc_weights['miniature golf, minigolf'] = outside
    loc_weights['mountain'] = outside
    loc_weights['museum'] = inside
    loc_weights['music, show venue, concert, concert hall'] = inside
    loc_weights['natural park'] = outside
    loc_weights['newsstand, newspaper, news, magazine'] = outside
    loc_weights['night club, disco'] = packed
    loc_weights['notary, notary public'] = inside
    loc_weights['nursery, garden, garden center'] = inside
    loc_weights['outdoors'] = outside
    loc_weights['painting, art'] = inside
    loc_weights['park'] = outside
    loc_weights['parking, parking lot'] = outside
    loc_weights['pet, petshop, dog, cat'] = inside
    loc_weights['pharmacy'] = inside
    loc_weights['photo, frame, framing'] = inside
    loc_weights['photography, photo service'] = inside
    loc_weights['physical therapy, rehabilitation'] = close
    loc_weights['pizza, restaurant'] = close
    loc_weights['police station, law enforcement'] = inside
    loc_weights['port, ferry'] = outside
    loc_weights['post office, mail'] = inside
    loc_weights['professional cleaning, cleaning'] = inside
    loc_weights['rail station, train station'] = outside
    loc_weights['real estate agent, realtor, real estate agency'] = inside
    loc_weights['rest area, rest stop, pitstop'] = inside
    loc_weights['restaurant'] = close
    loc_weights['scuba diving, pool'] = outside
    loc_weights['shoes, apparel'] = inside
    loc_weights['shopping center, mall, shopping mall'] = inside
    loc_weights['spa'] = close
    loc_weights['sporting good, sports store'] = inside
    loc_weights['storage, storage facility, storage lot'] = outside
    loc_weights['supermarket, groceries, grocery, market, super'] = inside
    loc_weights['swimming pool, pool, swim club'] = outside
    loc_weights['tailor'] = inside
    loc_weights['tattoo, tattooing'] = close
    loc_weights['theater, movie theater, cinema'] = inside
    loc_weights['tour, travel agent'] = inside
    loc_weights['tourist information, services, tourism, information'] = inside
    loc_weights['toy, toy shop'] = inside
    loc_weights['utility companies, utilities, utility, public utility, electricity, natural gas, water, sewage, power company'] = inside
    loc_weights['vehicle maintenance, car maintenance, vehicle repair, car repair'] = inside
    loc_weights['winery, vineyard, wine tasting'] = inside
    loc_weights['zoo, aquarium, wildlife sanctuary'] = outside
    return loc_weights


# In[ ]:




