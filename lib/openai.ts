import chalk from 'chalk';
import ora from 'ora';
import OpenAI from 'openai';
import { LlmOptions } from './types.js';

export async function callOpenAI(prompt: string, content: string, apiKey: string, llmOptions: LlmOptions, debug: boolean = false): Promise<string> {
  const spinner = ora(chalk.cyan('Making OpenAI API request...')).start();

  try {
    const openai = new OpenAI({
      baseURL: process.env.OPENAI_BASE_URL || undefined,
      apiKey: apiKey
    });

    const completion = await openai.chat.completions.create({
      model: llmOptions.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: content
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    spinner.succeed(chalk.green('OpenAI API request completed'));

    if (debug) {
      console.log(chalk.cyan('\n[DEBUG] LLM Information:'));
      console.log(chalk.yellow('[DEBUG] Prompt Tokens:'), chalk.white(completion.usage?.prompt_tokens));
      console.log(chalk.yellow('[DEBUG] Completion Tokens:'), chalk.white(completion.usage?.completion_tokens));
      console.log(chalk.yellow('[DEBUG] Total Tokens:'), chalk.white(completion.usage?.total_tokens));
      console.log(chalk.yellow('[DEBUG] Model:'), chalk.white(completion.model));
      console.log(chalk.yellow('[DEBUG] Finish Reason:'), chalk.white(completion.choices[0].finish_reason));
    }

    return completion.choices[0].message.content || '';
  } catch (error) {
    spinner.fail(chalk.red('OpenAI API request failed'));
    if (error instanceof Error) {
      console.error(chalk.red('Error message:'), error);
    }
    throw error;
  }
}