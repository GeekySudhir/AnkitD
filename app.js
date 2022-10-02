import React from "react";
import './App.css';
import logo1 from "./image/logos/logo1.png"
import logo2 from "./image/logos/logo2.png"
import logo3 from "./image/logos/logo3.png"
import logo4 from "./image/logos/logo4.png"
import logo5 from "./image/logos/logo5.png"

function App() {
  return(

    <body id="home">
    <nav id="navbar">
        <h1 class="logo">
            <span class="primary">
                <i class="fas fa-book-open"></i> hot
            </span>Jar
        </h1>
        <ul>
            <li><a href="#home">Product</a></li>
            <li><a href="#Hotjar">Why Hotjar</a></li>
            <li><a href="#Pricing">Pricing</a></li>
            <li><a href="#Learn">Learn</a></li>
            <li><a href="#Company">Company</a></li>
        </ul>
    </nav>


<section id="who">
 <div class="who-text bg-dar">
     <h2>Everything you ever <span class="primary">wanted to know</span> about your website...</h2>
     <p>...but your analytics never told you.</p>
     <h3 >Numbers tell you what’s happening. Hotjar’s visual insights tell you why. So you can make the changes that matter.</h3>
     <button id="emailButton">Start free with email</button>
     <button id="googleButton">Start free with Google</button>
 </div>
 <div class="videop">
      <iframe
        width="524" height="338" 
        src="https://www.youtube.com/embed/xdvxuXBoEbI" 
        title="Installing the Hotjar tracking code"
        frameborder="0"
        allow="autoplay; encrypted-media"
      />{" "}
      </div>
</section>


<section id="clients">
    <div class="container">
        <h1>Hotjar is trusted by 731,084 websites in 180+ countries</h1>
        <div class="items">
            <div><img src={logo1} alt="logo1"/></div>
            <div><img src={logo2} alt="logo1"/></div>
            <div><img src={logo3} alt="logo1"/></div>
            <div><img src={logo4} alt="logo1"/></div>
            <div><img src={logo5} alt="logo1"/></div>
            
        </div>
    </div>
</section>


<section id="who">

<div class="videop">
      <iframe
        width="724" height="538" r
        src="https://www.youtube.com/embed/SE59AnSXt9Y" 
        title="Get the big picture with Trends"
        frameborder="0"
        allow="autoplay; encrypted-media"
      />{" "}
      </div>

 <div class="who-text bg-dar">
     <h2>Here's how it works</h2>
     <details>
  <summary>Find out what's hot and what's not</summary>
  <p>Heatmaps give you an at-a-glance overview of how people interact with a page.

See how far they scroll, what buttons they click, and what content gets ignored.</p>
</details>

<details>
  <summary>See what your visitors see</summary>
  <p>Recordings let you experience your website through the eyes of your site visitors.

See their mouse movements, which pages they visit, and where they struggle.</p>
</details>

<details>
  <summary>Collect live feedback</summary>
  <p>Add feedback widgets to key pages to learn exactly how people feel about them.

If anything’s confusing or off-putting, you’ll find out fast.</p>
</details>
 </div>
</section>


<footer id="main-footer">
        <div class="container">
          <p>Copyright © 2014 - 2022 Hotjar Ltd. All rights reserved.</p>
          <span><b>Cookie info &nbsp;
          Cookie settings&nbsp;&nbsp;
          Do not track</b></span>
        </div>
      </footer>
  </body>
  )
}

export default App;