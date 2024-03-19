import fs from "fs";
import path from "path";
import OpenAI from "openai";
import * as constants from './constants.js';
import * as credentials from './credentails.js';

const normal = "tts-1";
const voice_hd = "tts-1-hd";
const available_voices = new Set(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);
let voice_array = Array.from(available_voices);

const openai = new OpenAI({
  apiKey: credentials.credentials.apiKey,
  organization: credentials.credentials.organization
});

const language_used = constants.languages.portuguese;

const speechFile = path.resolve(`./output_${language_used}/speech.ogg`);

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: normal,
    voice: voice_array[4],
    language: language_used,
    input: "Olá, cara... Então, tô meio assim, testando essas paradas... novas tecnologias, saca? E tipo, não tô muito certo se o português tá, tipo assim, certinho, entende? Então, hmm... será que você poderia, tipo, me ajudar aqui? Só, tipo assim, dar sua opinião?",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();