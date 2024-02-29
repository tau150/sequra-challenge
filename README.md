# The Challenge
<br>

## Context

SeQura provides e-commerce shops with a flexible payment method that allows shoppers to split their purchases in differents installments depending on the product price. In exchange, seQura earns a fee for each purchase.

This challenge is about implementing a widget in a merchant site demo so the shoppers can select how many instalments they like to pay with. <br><br>


## Problem statement

SeQura provides e-commerce shops (Merchants) a flexible payment method so their customers (Shoppers) can purchase the goods by paying in instalments. SeQura has analysed, that this kind of payment method requires the biggest effort in promotion by part of the merchant to make a difference in purchases quantity and average amount.

As part of our the product iteration process, the Product Designer from the team has made a wireframe and now is asking you to implement a widget to display the instalments options for a given product, on a merchant page. The Product Designer is also very interested in analysing any shopper interaction with the widget so the team can improve it in future iterations.

We expect you to:

Create the prototype for the wireframe that the Product Designer has given you (wireframe.png).
Integrate the prototype with seQura CreditAgreementAPI([Credit Agreements docs](https://sequra.github.io/frontend-challenge/src/api/README.html#credit-agreements-api)) to fetch financing information for a given product value.
Integrate the prototype with seQura EventsAPI ([Events docs](https://sequra.github.io/frontend-challenge/src/api/README.html#events-api)) triggering an event for each shopper interaction.
Integrate the prototype in the merchant sample site (merchant-site/product-page.html) so that every time the product price changes the financing value is updated.
Write up a paragraph with the way you would distribute this prototype to all our merchants.

 <br><br>


<img width="4000" alt="wireframe (1)" src="https://github.com/tau150/sequra-challenge/assets/11742373/8a726056-0881-429f-bde3-62c461c8cff7">

 <br><br>


# Solution

<br>

## Architecture and folder structure

The main idea was to keep the code as clean as possible segregating responsibilities. With this in mind I created a folder per feature in modules folder; at the moment we have just two main "features", but this distribution will allow us to scale without pain when new features come to the table.

Inside every module we will find the key piece of it, that is the domain folder. Our business entity and rules will be defined in it. This will allow us to have a good definition of our entity and always refer to it in the same way in out front end context. When it's necessary we will have an adapter folder, inside of it we will have our adapters utils, this will get our back end response and adapt to our domain and to what we need for our logic. At this point the implementation is quite simple, but here we can have some decode tool to have a more rigid check of our backend response and quickly identify when something unexpected is received.
The Services folder will contain our infrastructure, our in/out communication with external actors. Right now we have just an implementation for http communication, and probably we won't need anything else. But if we think we could have more implementations we should apply a repository pattern to consume abstractions and not punctual implementations in our code.
Finally, we will find our Components, hooks, utils, constants and all things we need four our UI.

With this approach I tried to separate the application layers as much as possible.

<br><br>

## Data fetching and cache

For our data fetching I implemented an util over fetch api to have more control over it and an abstraction to work over it. Besides that, I took the decision of using react-query to consume our services because it gives us a really good manage of the cache. This is particularly important for our use case, because now, if the user changes the dropdown multiple times, we are doing the call to the back end just once, when the amount change; otherwise we will be using our cache data. This library is super flexible and clean to handle our data and request status.

<br><br>

## Styles

For styling I chose tailwind, I haven't used it before in a professional role. In general I use styled-component, but tailwind is a better solution because it ships less js to the browser and decreases the run-time overhead. Being that our widget will be used in clients websites, I considered a better option. Css modules would also be valid, but assuming you use tailwind because it was implemented in the demo page, I chose it as the solution.

<br><br>

## Testing

For testing I used react-testing-library and vitest as test engine; vitest runs much better and faster in vite than jest.
<br>
I applied unit testing to what I considered the main functionalities of our app. I could go one step further and use msw to override server responses, but because of time constrains I decided to mock the use case implementation of the custom hooks.
<br>
You can check the test coverage running the following command:

```
npm run test:coverage

```

You will see there are some tests missing in services and custom hooks. I didn't consider necessary to run thes tests for those files if I am not overriding the backend response with msw, because those test will not be meaningful and our fetch implementation has its own test.

<br><br>


## Building and distribution

For building I set two different options, you can check them with the following commands.

```
npm run build
npm run build:components

```
<br><br>

### npm run build - Widget
<br>
This solution builds our widget to be used in html files, because it is agnostic and we don't know where it will be set. The bundle has to include the dependencies to work, like react and react-dom. For the distribution I would choose to deploy files to a CDN, to be available and cached with the lowest possible latency.
The way to use our widget in a client is adding the script and set the call to init method. Then the amount has to be updated with the exposed method setAmount of our js; this will dispatch a custom event that will communicate with our widget to update the agreements options, an example below.

First you will have to add an empty div like the following in the place where you want to set the widget.

```
<div id="sequra-widget">
</div>
```


```
  <script type="text/javascript">
     function init() {
       Sequra.renderWidget("39999")
     }

     function load() {
       var s = document.createElement('script')
       s.type = 'text/javascript'
       s.src = 'https://our-cdn-url.com'
       s.type = "module"
       s.onload = init
       var x = document.getElementsByTagName('script')[0]
       x.parentNode.insertBefore(s, x)
     }
       window.addEventListener('load', load, false)
  </script>
```
<br><br>

### npm run build:components - Widget as Library
<br>
The second solution will generate a distribution build of our widget as component to be imported in a React project and be used as regular component. In this case we just pass the amount and the component will update, we don't need to dispatch any event. Because this is thought to be used in a React project, the bundle size is much less lighter since it doesn't include react and react-dom.
To allow our library to be available for the public we will have to publish it in npm, so the client will install running npm i @secura/widget.
Take into consideration that this build process probably will need some adjustments. I wasn't able to do them because of time constrains.

<br><br>

## Linting

I have set some eslint rules to have a consistent style, but this is really opinionated and it can be customized to suit the development team's taste.


# How to run the project locally

<br>

### Configuration

Inside api folder run:
<br>

```
  npm install
  npm start

```
<br>
Inside client folder run:

<br>

```
  npm install
  Create a .env.local file and set VITE_BASE_HOST=http://localhost:8080
  npm run dev
```
<br><br>

### Considerations

For development purposes, running locally our widget is mounted in the example page and we are consuming directly our main file instead of consume the build solution from the cdn.
