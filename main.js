var container = document.getElementById('container');

let getData = function(url) {
			return new Promise(function(resolve, reject) {
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);
			xhttp.send();
			

			xhttp.onload = function() {
			if(xhttp.status == 200) {
			resolve(xhttp.response)
			} 
			else 
			{
			reject(xhttp.responseText)
			}
		}
	})
}

url = 'http://jservice.io/api/categories?count=5&offset=10'

var categories;

getData(url)
.then(res => {
	var categories = JSON.parse(res);
	let requestsArray = []
	for(let i = 0; i < categories.length; i++)
	{
		requestsArray.push(getData('http://jservice.io/api/category?id=' + categories[i].id))
		
	}
	return Promise.all(requestsArray)
	}).then(res => {
		res.map((val, i) => {
			var parsed = JSON.parse(val);
			var category = document.createElement('div');
			category.className = 'categories'
			category.innerHTML = parsed.title
			container.appendChild(category);
			
			var clues = parsed.clues
			
			var counter = 0;
			for (const object of clues){
				if (counter !=5)
				{
					addDivs(object)
					counter++;
				}
			}
			
				
			
		})

	}
);


let addDivs = function(object)
{

				var values = object.value;
				var numbers = document.createElement('div');
				numbers.className = 'panels';
				numbers.setAttribute('id', 'questions');
				numbers.innerHTML = values;
				container.appendChild(numbers);
				var count = 0;
				numbers.addEventListener('click', function()
				{
					if(count == 0)
					{
						numbers.innerHTML = object.question
						count++;
					}
					else
					{
						numbers.innerHTML = object.answer
					}
					
				});
				
				
}

