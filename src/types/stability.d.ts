interface StabilityResponse {
	artifacts: {
		base64: string;
		finishReason: string;
		seed: number;
	}[];
}