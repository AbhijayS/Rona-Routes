#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import requests as rq

state = 'Statewide Unallocated'
countyToPop = {}
countyToCov = {}


# In[3]:


def getPopDict():
    popData = pd.read_csv('popData.csv', engine = 'python')
    popData = popData.drop([col for col in list(popData) if col != 'County Name' and col != 'population'], axis = 1)
    #make countyToPop
    for index, row in popData.iterrows():
        countyToPop[row['County Name']] = row['population']
    return countyToPop


def getCovDict():
    covidData = pd.read_csv('covidData.csv', engine = 'python')
    covidData = covidData.drop([col for col in list(covidData) if col != 'County Name' and col != '11/6/2020'], axis = 1)
    #make countyToCov
    for index, row in covidData.iterrows():
        countyToCov[row['County Name']] = row['11/6/2020']
    return countyToCov


# In[4]:


def getHighestCasePercentage():
    max = 0
    maxCounty = ""
    for county in countyToCov:
        if countyToCov.get(county) > max:
            max = countyToCov.get(county)
            maxCounty = county
    return countyToCov.get(maxCounty) / countyToPop.get(county)


# In[5]:


new = pd.DataFrame(columns = ['County','Score'])


# In[ ]:




