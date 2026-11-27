import {
  handleLeadPost,
  jsonLeadResponse,
  type LeadEnv,
} from '../../src/lib/server/leadHandler';

export const onRequestPost: PagesFunction<LeadEnv> = async (context) => {
  const result = await handleLeadPost(context.request, context.env);
  return jsonLeadResponse(result);
};
