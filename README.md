Mazamas Summer Climb Schedule
=========
A redesigned and functioning climb schedule for the Mazamas. Includes not only improved style of the legacy version but greatly improved search functionality as well.  

Live URL: http://eferrer.info/mazamas_climbs/

Features:

* Complex logical searches. Allows you to search on various climb features and sort on any climb feature.
* More attractive responsive style which emphasizes the more important data of a climb and makes it much easier to scan climbs for info.

Known Issues:

* Loading takes a long time. This is because of CORS/AJAX limitations. The ajax request has to go through crossorigin.me first. Not to mention the original Mazamas site isnt the fastest site in the world in the first place. 

Future Features:
* Add climb to google/iphone calendar
* Wikipedia links to peak information
* Filter by peak via drop down
* More filters ( weekday climbs, maybe sliders for total number of people on a climb. )

How it works:
* Scrapes climb data from the current Mazama site with AJAX through crossorigin.me, the CORS proxy. Then takes this data and uses dynatable to make an object for each climb and load them in a custom template (ditching the original table template all together). Once loaded custom dynatable filters and sorts are bound to elements on the page .
