## Inspiration
We realized changing tabs frequently to manage songs on YouTube was getting frustrating, especially when there are 20 other tabs open in Chrome. So we decided to get rid of the problem by making a Chrome extension accessible from any web page!

## What it does
YouQ is a Chrome extension that allows you to create a queue of songs to be played on YouTube, and dynamically update it. It's simple, just log in and search for the songs you wanna hear next, and add it to the queue! No need to switch a single tab. There are definitely more important things that deserve our attention than the YouTube tab every 5 minutes.

## How we built it
Since the extension runs on the user's browser itself, most of the code was written in Javascript. Angular was used to provide seamless data-binding on the front-end. YouTube APIs made the project come together as we tied in user's details with their YouTube accounts.

## Challenges we ran into
Getting to work with OAuth2.0 was a really difficult task with Chrome. Chrome has strict laws about exchanging data with third-parties, since the code runs on the user's browser. Hence, no inline Javascript was allowed, and it was really difficult to test and get OAuth working with a Chrome extension (very less support is available online). Once we were past that, we realized that Angular/YouTube didn't allow us to embed videos seamlessly, so we had to find a way to open a YouTube web page doing the task for us. 

## Accomplishments that we're proud of
We're really proud to have managed OAuth integration in our app, despite the challenges and the easy alternative of using an external database. We also love the integration of Angular with our app. It made the flow smoother, providing the users a richer experience. Last, but not the least, we're happy with the way we dealt with the extensive set of YouTube APIs. With clever planning, we reduced our API calls by a significant margin, and made our application faster and secure.

## What we learned
We learnt how chrome extensions work, and how useful it is to understand the vulnerabilities in making such extensions. It was also our first shot at OAuth2.0 and learning Angular. Overall, it was a very intensive learning project!

## What's next for YouQ
We are working on providing a floating YouTube viewer so that that the user can see from any application. Interactive queue management is another possibility.
