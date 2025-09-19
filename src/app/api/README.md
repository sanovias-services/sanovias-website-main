## API Route

* Concept: In Next.js, API routes are server-side functions that handle HTTP requests (like POST, GET). 
* Example which defines a handler for POST requests to `/api/contact`:

```export async function POST(request: NextRequest) { ... }```

## Async function
* Async architecture means that the execution of the task is not blocking. Tasks can therefore run simultaneously. 
* The asynchronous function starts a process and sets things up so that the callback function is called when the process finishes and then returns.
* They `async` keyword before the function makes the function return a promise.
* Promise: an object representing the eventual completion or failure of an async operation. It represents a value that might be available now, later, or never.
* The `await` keyword can only be used inside an async function. It makes the function pause the execution until the Promise is resolved. Example (await makes the function wait for the Promise returned by `fetch` and `response.json()` before continuing):
```
async function getData() {
  const response = await fetch("https://api.example.com/data"); // waits for fetch to finish
  const result = await response.json(); // waits for JSON parsing
  return result;
}
```

## TypeScript Interfnace
* Concept: Interfaces define the shape of data for type safety.
* Example ensuring the incoming data matches the expected fields:

```interface ContactFormData { ... }```

## Parsing Request Data
* Concept: Extracting and converting the incoming request body to usable data.
* Example: parsing the JSON body sent from the client

```const data: ContactFormData = await request.json();```

## Validation
* Concept: Checking that required fields are present and correctly formatted.
* Example: return the error JSON when one of the fields is null
```
if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
  return NextResponse.json(
    { success: false, message: "All required fields must be provided" },
    { status: 400 }
  );
}
```
## Response Handling
* Concept: Sending structured responses back to the client, including status codes.
* Example: returns a success message as JSON
```
return NextResponse.json({
  success: true,
  message: "Thank you for your inquiry! We will contact you within 24 hours.",
});
```

## Error Handling
* Concept: Catching and responding to unexpected errors.
* Example: see the catch block that logs the error and retunrs a 500 status code