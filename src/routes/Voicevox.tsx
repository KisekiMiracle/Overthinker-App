import { useActionState, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { NeumorphButton } from "../components";

// TODO - Create Sliders
// TODO - Create Presets

export function VoiceVoxPage() {
	const [searchParams] = useSearchParams();
	const defaultText = searchParams.get("texto") || "Hola mundo";
	const [text, setText] = useState(defaultText);
	const [state, formAction, isPending] = useActionState(sintetizar, null);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const baseUrl = "https://voicevox.kiseki-miracle.dev/"; // <-- cambia esto
	const speakerId = 8;

	async function sintetizar() {
		// 1. audio_query
		const queryRes = await fetch(
			`${baseUrl}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`,
			{
				method: "POST",
				headers: { accept: "application/json" },
			},
		);

		if (!queryRes.ok) {
			alert("Error en audio_query");
			return;
		}

		const query = await queryRes.json();

		// 🎀 Ajustes kawaii
		query.pitchScale = 0.02; // tono más agudo
		query.speedScale = 0.9; // habla más rápido
		query.intonationScale = 1.5; // más expresiva
		query.volumeScale = 1.1; // un poco más fuerte
		query.prePhonemeLength = 0.1; // pequeña pausa antes
		query.postPhonemeLength = 0.1; // pequeña pausa después

		// 2. synthesis
		const synthesisRes = await fetch(
			`${baseUrl}/synthesis?speaker=${speakerId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					accept: "audio/wav",
				},
				body: JSON.stringify(query),
			},
		);

		if (!synthesisRes.ok) {
			alert("Error en synthesis");
			return;
		}

		// 3. Reproducir
		const blob = await synthesisRes.blob();
		setAudioUrl(URL.createObjectURL(blob));
		console.log("blob", blob);
		return;
	}

	return (
		<article style={{ padding: "2rem" }}>
			<h1>VoiceVox desde React</h1>
			<form
				id="login-form"
				noValidate
				className="flex flex-col gap-y-6 "
				action={formAction}
			>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					style={{ width: "300px" }}
				/>
				<NeumorphButton
					type="submit"
					label={isPending ? "Generando audio..." : "Generar"}
					disabled={isPending}
					icon={<FaLocationArrow />}
				/>
			</form>
			{audioUrl && (
				<audio controls src={audioUrl}>
					<track
						default
						kind="captions"
						srcLang="jp"
						label="japanese_captions"
					/>
					<source src={audioUrl} />
				</audio>
			)}
		</article>
	);
}
