const white_list = [
'1.1.1.1',
'YOUR.IP.FOR.ACCESS'
];
addEventListener("fetch", event => {
  event.respondWith(fetchAndReplace(event.request))
})

async function fetchAndReplace(request) {

  let modifiedHeaders = new Headers()

  modifiedHeaders.set('Content-Type', 'text/html')
  modifiedHeaders.append('Pragma', 'no-cache')


  //Allow users from trusted into site
  if (white_list.indexOf(request.headers.get("cf-connecting-ip")) > -1) 
  {
    //Fire all other requests directly to our WebServers
    return fetch(request)
  }
  else //Return maint page if you're not calling from a trusted IP
  {
    // Return modified response.
    return new Response(maintPage, {
      status: 503,
      headers: modifiedHeaders
    })
  }
}

let maintPage = `
<!doctype html>
<title>Site Maintenance</title>
<style>
  body { text-align: center; padding: 150px; }
  h1 { font-size: 50px; }
  body { font: 20px Helvetica, sans-serif; color: #333; }
  article { display: block; text-align: left; width: 650px; margin: 0 auto; }
  a { color: #dc8100; text-decoration: none; }
  p { color: #FFFFFF; }
  a:hover { color: #333; text-decoration: none; }
  body {
  /* The image used */
  background-color:#000000;
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<article>
    <h1>We&rsquo;ll be back soon!</h1>
    <div>
        <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always <a href="mailto:info@otinov.ml">contact us</a>, otherwise we&rsquo;ll be back online shortly!</p>
        <p>&mdash; The Team</p>
    </div>
</article>
`;
