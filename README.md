### Notes:
- I was unsure what exactly was meant in the specs here:
> At the root path (e.g., http://localhost:8080/), a user should be presented with a form that allows them to input a URL. When a user submits that form, it should convert the input URL to a shortened version and present that to the user.
> The shortened URL should be in the format: http://localhost:8080/{slug}, where {slug} is a unique identifier for the original URL.
> When a user navigates to the shortened URL, they should be redirected to the original URL that was used to generate this shortened URL. 
- Maybe I totally misunderstood the assignment... but I was unsure whether or not the URLs allowed to be shortened should be dynamic or not. The redirecting in my solution just takes a user to the same component, albeit with a different path in the url... If I was supposed to create a few paths (`/some-long-url-path`) and only allow the user to shorten these paths, then that could have been easily done, but it looks like tinyURL lets a user plug in pretty much any URL, not just ones that exist on that site.
- The problem with my solution currently is if someone puts in a `long-url-path-with-a-/-character`, then it will fail on the redirect, because the `[slug]` page doesn't match subdirectories. So, that's a problem :(. I've explored using `[...slug]` or `[[...slug]]` to catch all subdirectories as well, but couldn't get it to work. I'd have to dive more into nextJS dynamic routing to see how to do that, and I just don't have time.
- The function to convert from long id to short id is extremely naive. If I had more time, the next step would be to figure out how the existing applications (i.e. tinyurl) do this, or research what might be a good approach here. This function works for the purposes of this coding project.
### Implementation Details
- Pretty basic implementation. There are two api routes:
- `getShortId` - takes a long id, and returns a short one
- `getLongId` - takes a short id, and returns the original long id that the given short id was generated from
- The user can enter a "long form URL" on the home page, and after some basic validation, the URL is stripped down to the long id (everything after `http://localhost:8080/`), and sent to the server (via `getShortId`). The long id is converted to a short id, and a map of short id -> long id is updated on the backend (in lieu of a proper database) The short id is then returned and displayed to the user.
- The user can then navigate to `http://localhost:8080/{shortId}`, where `{shortId}` is some short id that has previously been generated from `getShortId`. That short id is sent to the server (via `getLongId`) and it is seen if the long id exists associated with that short id. If it exists, the application redirects to that url.
### How to Run
- `npm i` in the root directory will install dependencies.
- `npm run start` will start up the application. The frontend can be accessed at `http://localhost:8080/`
### Testing
- I just tested this application manually by entering different URLs, shortening them, and then navigating the the shortened URLs and verifying I got redirected back to the long URL.
### Tools Used
- I used NextJS as my web framework
- TypeScript, EsLint
- Axios for communication with server
- I used ChatGPT to assist with setting up the project and to bounce ideas off of when programming
