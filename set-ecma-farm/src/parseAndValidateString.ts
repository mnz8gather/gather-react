/**
 * 校验字符串的格式为 ()、[]、[)、(]、<> 他们之间用逗号分隔
 * <> 内的内容不能包含空格或逗号
 * ()、[]、[)、(] 必须只包含一个逗，逗号的至少一侧必须包含非空/非空格的内容
 */

type BracketType = '()' | '[]' | '[)' | '(]' | '<>';

interface PatternInfo {
  type: BracketType;
  regex: RegExp;
}

interface BaseSegmentResult {
  original_segment: string;
  trimmed_segment: string;
}

interface ValidSegmentResult extends BaseSegmentResult {
  is_valid: true;
  type: BracketType;
  content: string;
}

interface InvalidSegmentResult extends BaseSegmentResult {
  is_valid: false;
  error_message: string;
  type?: BracketType;
  content?: string;
}

type SegmentParseResult = ValidSegmentResult | InvalidSegmentResult;

const openBracketSet: Set<string> = new Set(['(', '[', '<']);
const closeBracketSet: Set<string> = new Set([')', ']', '>']);

export function parseAndValidateString(inputStr: string): SegmentParseResult[] {
  const results: SegmentParseResult[] = [];
  const segments: string[] = [];

  let buffer: string = '';
  const openBracketStack: string[] = [];

  for (let i = 0; i < inputStr.length; i++) {
    const char: string = inputStr[i];
    buffer += char;

    if (openBracketSet.has(char)) {
      openBracketStack.push(char);
    } else if (closeBracketSet.has(char)) {
      if (openBracketStack.length > 0) {
        openBracketStack.pop();
      }
    }

    if (char === ',' && openBracketStack.length === 0) {
      segments.push(buffer.slice(0, -1));
      buffer = '';
    }
  }
  if (buffer) {
    segments.push(buffer);
  }

  const patterns: PatternInfo[] = [
    { type: '()', regex: /^\((.*?)\)$/ },
    { type: '[]', regex: /^\[(.*?)\]$/ },
    { type: '[)', regex: /^\[(.*?)\)$/ },
    { type: '(]', regex: /^\((.*?)\]$/ },
    { type: '<>', regex: /^<(.*?)>$/ },
  ];

  for (const segment of segments) {
    const segmentStripped: string = segment.trim();

    if (!segmentStripped) {
      results.push({
        original_segment: segment,
        trimmed_segment: segmentStripped,
        is_valid: false,
        error_message: 'Segment is empty after stripping whitespace.',
      });
      continue;
    }

    let matched = false;
    for (const pInfo of patterns) {
      const match: RegExpExecArray | null = pInfo.regex.exec(segmentStripped);
      if (match) {
        const extractedContent: string = match[1];

        let isValidRegardingContent = true;
        let specificContentErrorMessage = '';

        // <>内的内容不能包含空格或逗号。
        if (pInfo.type === '<>') {
          if (extractedContent.includes(' ') || extractedContent.includes(',')) {
            isValidRegardingContent = false;
            specificContentErrorMessage = 'Content inside <> cannot contain spaces or commas.';
          }
        }
        // ()、[]、[)、(] 类型的规则：
        // 1. 内容必须只包含一个逗号。
        // 2. 逗号的至少一侧必须包含非空/非空格的内容。
        if (['()', '[]', '[)', '(]'].includes(pInfo.type)) {
          const commaMatches: RegExpMatchArray | null = extractedContent.match(/,/g);
          const commaCount: number = commaMatches ? commaMatches.length : 0;

          if (commaCount === 1) {
            const parts: string[] = extractedContent.split(',');
            const leftPart: string = parts[0].trim();
            const rightPart: string = parts[1].trim();
            if (leftPart === '' && rightPart === '') {
              isValidRegardingContent = false;
              specificContentErrorMessage = `Content on at least one side of the comma in ${pInfo.type} must not be empty or just whitespace.`;
            }
          } else {
            isValidRegardingContent = false;
            specificContentErrorMessage = `Content inside ${pInfo.type} must contain exactly one comma.`;
          }
        }

        if (isValidRegardingContent) {
          results.push({
            original_segment: segment,
            trimmed_segment: segmentStripped,
            is_valid: true,
            type: pInfo.type,
            content: extractedContent,
          });
        } else {
          results.push({
            original_segment: segment,
            trimmed_segment: segmentStripped,
            is_valid: false,
            type: pInfo.type,
            content: extractedContent,
            error_message: specificContentErrorMessage,
          });
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      results.push({
        original_segment: segment,
        trimmed_segment: segmentStripped,
        is_valid: false,
        error_message: 'Invalid format or unknown bracket type.',
      });
    }
  }
  return results;
}
