import axios from 'axios';



export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    // Call Hugging Face API
    const response = await axios.post(  
      'https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-sms-spam-detection',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );

    // Return Hugging Face response
    return new Response(JSON.stringify({ result: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to process the request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: 'This endpoint only supports POST requests' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
