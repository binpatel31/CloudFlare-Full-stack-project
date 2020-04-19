async function handleRequest(request) 
{
	const LanguageRes = await fetch("https://cfw-takehome.developers.workers.dev/api/variants");
	const Language = await LanguageRes.text();
	const urls = JSON.parse(Language)["variants"];
	var res = await fetch(urls[0]); //.then(function(response) { response.text().then(function(text) { document.getElementByTagName("title")[0].innerHTML="DEMODEMO"})});
	var datas = await res.text();
	var res1 = await fetch(urls[1]); //.then(function(response) { response.text().then(function(text) { document.getElementByTagName("title")[0].innerHTML="DEMODEMO"})});
        var datas1 = await res1.text();
	const init = {
    		headers: {
      		'content-type': 'text/html;charset=UTF-8',
    			},
  		};

	var contents = datas.replace("<title>Variant 1</title>","<title>MY TITLE 1</title>");
        var contents1 = datas1.replace("<title>Variant 2</title>","<title>MY TITLE 2</title>");
 	const cookie = request.headers.get('cookie');
  	if (cookie && cookie.includes('${NAME}=control')) 
	{
    		return new Response(contents, init);
  	} 
	else if (cookie && cookie.includes('${NAME}=test')) 
	{
    		return new Response(contents1, init);
  	}	 
	else 
	{
    		let group = Math.random() < 0.5 ? 'test' : 'control'; // 50/50 split;
    		if (group === "control")
	  	{
    			let response =  new Response(contents, init);
    			response.headers.append('Set-Cookie', '${NAME}=${group}; path=/');
    			return response;
  		}
		else
		{
			let response =  new Response(contents1, init);
                        response.headers.append('Set-Cookie', '${NAME}=${group}; path=/');
                        return response;

		}
	}
}

addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request));
})



