import fetch from 'node-fetch';

import { ExecutionRequest, ExecutionResult } from './type';
import { Settings } from './_types';

const BASE_URL = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run';

const runner = async (args: ExecutionRequest, settings: Settings): Promise<ExecutionResult> => {
  const apiKey = settings.RAPIDAPI_KEY;

  if (!apiKey) {
    throw new Error('RapidAPI key is missing');
  }

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com',
      },
      body: JSON.stringify({
        language: args.language,
        stdin: args.stdin || '',
        files: args.files,
      }),
    });

    if (!res.ok) {
      throw new Error(`OneCompiler API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data as ExecutionResult;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};

export default runner;
