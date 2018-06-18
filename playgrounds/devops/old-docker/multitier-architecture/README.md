# Multitier Architecture in Development Environment

<p>Using Docker Compose to produce the following architecture:</p>

---------------

<p>API Load Balancer --> 2x App Servers --> DB </p>
<p>Web Load Balancer --> 2x Web Servers</p>

-----------------------

<p>Web Servers will server static content with code that will ping the app servers</p>
