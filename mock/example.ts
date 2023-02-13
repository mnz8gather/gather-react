export default {
  'GET /api/custom/getCustom': (req: any, res: any) => {
    res.json({
      success: true,
      data: ['g3', 'g4', 'g5', 't2', 't5'],
      errorCode: 0,
    });
  },
  'POST /api/custom/setCustom': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
