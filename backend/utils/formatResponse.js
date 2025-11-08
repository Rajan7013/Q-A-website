export function formatResponse(rawText) {
  let formatted = rawText;

  // Remove all markdown bold variations (**text**, __text__)
  formatted = formatted.replace(/\*\*\*([^*]+)\*\*\*/g, '$1');  // Triple asterisks
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '$1');      // Double asterisks
  formatted = formatted.replace(/___([^_]+)___/g, '$1');        // Triple underscores
  formatted = formatted.replace(/__([^_]+)__/g, '$1');          // Double underscores
  
  // Remove markdown italic (*text*, _text_)
  formatted = formatted.replace(/\*([^*\n]+)\*/g, '$1');
  formatted = formatted.replace(/_([^_\n]+)_/g, '$1');
  
  // Remove markdown headers (# ## ### etc.)
  formatted = formatted.replace(/^#{1,6}\s+(.+)$/gm, '$1');
  
  // Remove inline code backticks (`code`)
  formatted = formatted.replace(/`([^`]+)`/g, '$1');
  
  // Remove code blocks (```code```)
  formatted = formatted.replace(/```[\s\S]*?```/g, (match) => {
    // Extract just the code content without the backticks
    return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
  });
  
  // Remove markdown links [text](url) - keep just the text
  formatted = formatted.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // Remove HTML tags if any
  formatted = formatted.replace(/<[^>]+>/g, '');
  
  // Clean up any remaining special markdown characters
  formatted = formatted.replace(/[*_#`<>]/g, '');
  
  // Fix multiple spaces
  formatted = formatted.replace(/  +/g, ' ');
  
  // Ensure proper paragraph spacing (double line breaks)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace from each line
  formatted = formatted.split('\n').map(line => line.trim()).join('\n');
  
  // Remove empty lines at start and end
  formatted = formatted.trim();
  
  return formatted;
}

export function stripMarkdown(text) {
  return text
    .replace(/[*_#`<>]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
}