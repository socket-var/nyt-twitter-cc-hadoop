<h1 style="text-align: center">CSE 587 - Lab 2 report</h1>
<h2 style="text-align: center">Data Aggregation, Big data analysis and Visualization</h2>

## Submitted by:

#### Saketh Varma, Pericherla - sakethva - 50288206

#### Aditya Vikram, Parakala - aparakal - 50289171

## Instructions:

- Create a new virtual environment. If you are using anaconda use

  ```shell
  $ conda create --name env_name
  ```

- Activate the created environment

  ```shell
  $ conda activate env_name
  ```

- The project already comes with a requirements.txt file so use the below command to install all the project dependencies

  ```shell
  $ pip install -r requirements.txt
  ```

- Create a `.env` file in the root of the project and store secrets like TWITTER_CONSUMER_KEY, NYTIMES_API_KEY etc
- Type python on the command line and type the following commands to install nltk packages:
  ```shell
  C:\Users\socket_var\Desktop\dic>python
  Python 3.7.3 (default, Mar 27 2019, 17:13:21) [MSC v.1915 64 bit (AMD64)] :: Anaconda, Inc. on win32
  Type "help", "copyright", "credits" or "license" for more information.
  >>> import nltk
  >>> nltk.download("wordnet")
  >>> nltk.download("stopwords")
  >>>
  ```
- To get the website up and running install the npm package called ```serve``` by using the command:
  ```shell
  $ npm install serve -g
  ```
- Now go to the ((website root directory here)) and just type
  ```shell
  $ serve
  ```
- Head over to [http://localhost:5000](http://localhost:5000) and browse through the visualizations.


## Data collection:

The below flow chart summarizes the data collection logistics:

![Data collection flow chart](./images/collect_data.jpg)

### New York Times:

### Common Crawl:

### Twitter:


## Data processing:

### New York Times:

### Common Crawl:

### Twitter:


## Hadoop workflow:

The below flow chart summarizes the process of performing big-data analysis for this lab: 

![Hadoop flow chart](./images/hadoop.jpg)

### Word count algorithm:

### Word co-occurence algorithm:

## Visualization using d3.js:

## Observations:

### Baseball:

### Basketball:

### Soccer:

### American Football:

### Golf: