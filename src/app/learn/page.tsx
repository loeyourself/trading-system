'use client';

import Sidebar from '@/components/Sidebar';

export default function LearnPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📚 每日投资学习</h1>
          <p className="text-slate-500 mt-1">2026-04-16 最新观点汇总</p>
        </div>

        {/* 核心观点卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-red-600 mb-4">⚠️ 不看好方向</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <span className="font-medium">算力租赁</span>
                  <p className="text-slate-500">群主明确表示不看好商业逻辑："花钱买卡的算力租赁企业，赌的是token的价格好，类似于以前的炒房团"。可持续性存疑。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <span className="font-medium">蓝色光标</span>
                  <p className="text-slate-500">群主表示："没有什么看法，依然担心大模型会吞噬一切软件"</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-emerald-600 mb-4">✅ 看好方向</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <div>
                  <span className="font-medium">AIDC（AI数据中心）</span>
                  <p className="text-slate-500">真正可持续的商业模式。纯正AIDC: 润泽科技、光环新网、东阳光、数据港。网宿科技（边缘算力+CDN）安全系数高。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <div>
                  <span className="font-medium">锂矿（大周期）</span>
                  <p className="text-slate-500">26年紧平衡，27年供给短缺。核心品种: 赣锋锂业、盛新锂能。碳酸锂有涨价趋势。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <div>
                  <span className="font-medium">欧陆通（谷歌电源）</span>
                  <p className="text-slate-500">谷歌电源三供（约10%份额），电源壁垒高，稀缺性高，今年一直强调关注。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 重要标的跟踪 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📋 重要标的跟踪</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3">标的</th>
                  <th className="text-left px-4 py-3">方向</th>
                  <th className="text-left px-4 py-3">观点</th>
                  <th className="text-left px-4 py-3">操作建议</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">盛新锂能</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">锂矿</span></td>
                  <td className="px-4 py-3 text-slate-600">圈内在去年10月就拎出，双双新高</td>
                  <td className="px-4 py-3 text-emerald-600">持有，碳酸锂涨价趋势</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">赣锋锂业</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">锂矿</span></td>
                  <td className="px-4 py-3 text-slate-600">权益产能/市值比高</td>
                  <td className="px-4 py-3 text-emerald-600">持有</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">欧陆通</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">谷歌线</span></td>
                  <td className="px-4 py-3 text-slate-600">谷歌电源三供，壁垒高</td>
                  <td className="px-4 py-3 text-emerald-600">关注5日线</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">世运电路</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">特斯拉/PCB</span></td>
                  <td className="px-4 py-3 text-slate-600">跟特斯拉AI芯片，供货Dojo服务器PCB</td>
                  <td className="px-4 py-3 text-amber-600">一字板不卖</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">金海通</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">封测设备</span></td>
                  <td className="px-4 py-3 text-slate-600">分选机龙头，26Q1营收+121%，目标市值300亿</td>
                  <td className="px-4 py-3 text-emerald-600">看好</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">伊戈尔</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">业绩拐点</span></td>
                  <td className="px-4 py-3 text-slate-600">一季报超预期，美国工厂已投产</td>
                  <td className="px-4 py-3 text-emerald-600">关注</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">云南锗业</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">兑现</span></td>
                  <td className="px-4 py-3 text-slate-600">前期累计涨幅大</td>
                  <td className="px-4 py-3 text-red-600">跌破5日线止盈</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">汇绿生态</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">减仓</span></td>
                  <td className="px-4 py-3 text-slate-600">等收购方面眉目</td>
                  <td className="px-4 py-3 text-amber-600">建议减仓1/2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">银轮股份</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">机器人</span></td>
                  <td className="px-4 py-3 text-slate-600">机器人双子星，看1000亿</td>
                  <td className="px-4 py-3 text-emerald-600">Q2关注北美客户落地</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">宁波华翔</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">机器人</span></td>
                  <td className="px-4 py-3 text-slate-600">董事长带队攻客户，链量产临门一脚，看500亿</td>
                  <td className="px-4 py-3 text-emerald-600">Q2超预期潜力大</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 市场研判 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📊 市场研判</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-700 mb-2">大盘观点</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 短线4000点震荡整固，消化获利盘</li>
                <li>• AI产业高景气、国产替代加速、流动性宽松逻辑未破</li>
                <li>• 业绩主线成为核心驱动</li>
                <li>• 热点轮动快，宜控仓规避高位股</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-700 mb-2">投资体系核心理念</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>大盘》风格》板块》个股</strong></li>
                <li>• <strong>多卡节奏、少选个股</strong></li>
                <li>• 基本面+趋势结合，不用完全信任基本面</li>
                <li>• 用均线趋势感知市场，顺势而为</li>
                <li>• 梅家圈看重人不看重票</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 产业链逻辑 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🔗 产业链逻辑</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-slate-700 mb-2">AIDC vs 算力租赁</h3>
              <p className="text-slate-500">AIDC = 运营方/二手房东，配齐场地、液冷、配电、网络</p>
              <p className="text-slate-500 mt-2">算力租赁 = 买GPU卡租给AIDC（房东），赌token价格</p>
              <p className="text-red-500 mt-2 font-medium">结论：AIDC才是可持续模式</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-700 mb-2">光模块三处预期差</h3>
              <ol className="text-slate-500 space-y-1 list-decimal list-inside">
                <li>1.6T需求爆发被低估</li>
                <li>价格战担忧过度</li>
                <li>CPO/3.2T商用进度滞后</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-slate-700 mb-2">封测设备逻辑</h3>
              <p className="text-slate-500">后道测试预期差最大</p>
              <p className="text-slate-500">AI、先进封装推动设备需求</p>
              <p className="text-emerald-600 mt-2">关注: 长川科技、华峰测控、伟测科技</p>
            </div>
          </div>
        </div>

        {/* 操作记录 */}
        <div className="bg-amber-50 rounded-xl p-4 text-sm">
          <h3 className="font-bold text-amber-700 mb-2">📝 操作提醒</h3>
          <ul className="space-y-1 text-amber-600">
            <li>• 草甘膦：五日均线朝下，再观察</li>
            <li>• 涪陵电力：低位，等资金高切低</li>
            <li>• 上能电气：看逻辑和成本</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
