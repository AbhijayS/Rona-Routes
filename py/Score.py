#!/usr/bin/env python
# coding: utf-8

# In[8]:


#imports
import numpy as np
from DataProcessing import *
from LocWeights import *





# In[ ]:





# In[7]:





# In[6]:


def getWorstScore():
    #defines the worst score to be used for scaling
    return getHighestCasePercentage() * 5 * 1

def getLocScaledScore(raw):
    #takes a raw location score and return a scaled score, with 1 being the worst 
    return raw/worstScore


# In[ ]:




#instance variables
countyToCov = getCovDict()
countyToPop = getPopDict()
locWeights = generateLocWeights()
worstScore = getWorstScore()

#defs
def setupData():
    countyToCov = getCovDict()
    countyToPop = getPopDict()
    locWeights = generateLocWeights()
    worstScore = getWorstScore()

def scoreLoc(county, locType):
    #(cases/pop) * locatiopn weight(1-5) * level of people there(1-5)
    return getLocScaledScore((countyToCov.get(county) / countyToPop.get(county)) * locWeights.get(locType) * 1)

def scoreRoute(county, locType, transport):
    if(transport == "car"):
        return scoreLoc(county, locType)
    else:
        return scoreLoc(county, locType) + 0.2