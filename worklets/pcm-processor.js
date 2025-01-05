// public/pcm-processor.js
class PCMProcessor extends AudioWorkletProcessor {
    process(inputs, outputs) {
      const input = inputs[0];
      if (input && input[0]) {
        const pcmData = this.convertFloat32ToInt16(input[0]);
        this.port.postMessage(pcmData); // Send PCM data back to the main script
      }
      return true;
    }
  
    convertFloat32ToInt16(buffer) {
      const len = buffer.length;
      const result = new Int16Array(len);
      for (let i = 0; i < len; i++) {
        result[i] = Math.min(1, buffer[i]) * 0x7fff;
      }
      return result.buffer;
    }
  }
  
  registerProcessor('pcm-processor', PCMProcessor);
  