'use client';

import Sidebar from '@/components/Sidebar';

export default function LearnPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📚 每日投资学习</h1>
          <p className="text-slate-500 mt-1">来源：梅S分享群 + 先知小密圈 · 2026-04-16</p>
        </div>

        {/* 核心理念 */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-sm p-6 mb-8 text-white">
          <h2 className="text-xl font-bold mb-4">🎯 投资体系核心理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg mb-1">大盘 → 风格 → 板块 → 个股</div>
              <div className="text-slate-300">优先判断大盘趋势，再选风格和板块，最后是个股</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg mb-1">多卡节奏、少选个股</div>
              <div className="text-slate-300">不要频繁选股换股，顺势而为，减少焦虑</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg mb-1">用基本面，不是完全信任基本面</div>
              <div className="text-slate-300">基本面+趋势结合，关注均线趋势</div>
            </div>
          </div>
        </div>

        {/* 市场研判 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📊 市场研判</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-emerald-600 mb-3">中期方向（明确看好）</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• AI产业高景气、国产替代加速</li>
                <li>• 流动性宽松核心逻辑未破</li>
                <li>• 行情震荡上行趋势依旧明确</li>
                <li>• 业绩主线成为核心驱动</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-600 mb-3">短期（谨慎）</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 短线4000点震荡整固</li>
                <li>• 消化前期获利盘</li>
                <li>• 热点轮动快，宜控仓</li>
                <li>• 规避高位股</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 看好方向 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-emerald-600 mb-4">✅ 看好方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">🔋 锂矿（大周期）</h3>
              <p className="text-sm text-slate-600 mb-2">26年紧平衡，27年供给短缺，大周期提价</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">核心标的：</span>
                <span className="text-slate-500">赣锋锂业、盛新锂能（双双新高）</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">🏭 AIDC（AI数据中心）</h3>
              <p className="text-sm text-slate-600 mb-2">真正可持续的商业模式，AIDC企业才是赚钱的</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">纯正AIDC：</span>
                <span className="text-slate-500">润泽科技、光环新网、东阳光、数据港</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">⚡ 欧陆通（谷歌电源）</h3>
              <p className="text-sm text-slate-600 mb-2">谷歌电源三供，电源壁垒高稀缺性高</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">关注：</span>
                <span className="text-slate-500">5日线，不破持有</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">🤖 机器人（双子星）</h3>
              <p className="text-sm text-slate-600 mb-2">Q2看北美客户落地+CAT加单</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">标的：</span>
                <span className="text-slate-500">银轮股份（看1000亿）、宁波华翔（看500亿）</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">🔬 封测设备</h3>
              <p className="text-sm text-slate-600 mb-2">后道测试预期差最大，AI+先进封装推动需求</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">关注：</span>
                <span className="text-slate-500">金海通（目标300亿）、长川科技、华峰测控</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">📡 光模块</h3>
              <p className="text-sm text-slate-600 mb-2">1.6T需求被低估，三处预期差</p>
              <div className="text-xs">
                <span className="text-emerald-600 font-medium">逻辑：</span>
                <span className="text-slate-500">寡头格局头部企业盈利韧性强</span>
              </div>
            </div>
          </div>
        </div>

        {/* 不看好方向 */}
        <div className="bg-red-50 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ 不看好/谨慎方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-red-600 mb-2">算力租赁</h3>
              <p className="text-sm text-slate-600">群主明确表示不看好："花钱买卡的算力租赁企业，赌的是token价格，类似于炒房团，不是可持续商业模式"</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-red-600 mb-2">蓝色光标</h3>
              <p className="text-sm text-slate-600">群主表示："依然担心大模型会吞噬一切软件"</p>
            </div>
          </div>
        </div>

        {/* 重要标的跟踪 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📋 重要标的跟踪</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3">标的</th>
                  <th className="text-left px-4 py-3">方向</th>
                  <th className="text-left px-4 py-3">最新观点</th>
                  <th className="text-left px-4 py-3">操作建议</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">盛新锂能</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">锂矿</span></td>
                  <td className="px-4 py-3 text-slate-600">圈内去年10月就拎出，双双新高，碳酸锂涨价趋势</td>
                  <td className="px-4 py-3 text-emerald-600">持有</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">赣锋锂业</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">锂矿</span></td>
                  <td className="px-4 py-3 text-slate-600">权益产能/市值比高</td>
                  <td className="px-4 py-3 text-emerald-600">持有</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">欧陆通</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">谷歌线</span></td>
                  <td className="px-4 py-3 text-slate-600">谷歌电源三供，壁垒高，天风在吹</td>
                  <td className="px-4 py-3 text-emerald-600">关注5日线</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">世运电路</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">特斯拉</span></td>
                  <td className="px-4 py-3 text-slate-600">供货特斯拉Dojo服务器PCB，特斯拉AI5芯片流片</td>
                  <td className="px-4 py-3 text-amber-600">一字板不卖</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">金海通</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">封测设备</span></td>
                  <td className="px-4 py-3 text-slate-600">分选机龙头，26Q1营收+121%，目标市值300亿</td>
                  <td className="px-4 py-3 text-emerald-600">看好</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">伊戈尔</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">业绩拐点</span></td>
                  <td className="px-4 py-3 text-slate-600">一季报超预期，美国工厂已投产，SST产品发布</td>
                  <td className="px-4 py-3 text-emerald-600">关注</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">宁德时代</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">锂电</span></td>
                  <td className="px-4 py-3 text-slate-600">全球动力市占率40.5%，产能利用率85-90%，26年冲击千亿利润</td>
                  <td className="px-4 py-3 text-emerald-600">看好</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">银轮股份</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">机器人</span></td>
                  <td className="px-4 py-3 text-slate-600">机器人双子星，Q2看北美G客户落地+CAT加单</td>
                  <td className="px-4 py-3 text-emerald-600">看1000亿</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">宁波华翔</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">机器人</span></td>
                  <td className="px-4 py-3 text-slate-600">董事长带队攻客户，链量产临门一脚</td>
                  <td className="px-4 py-3 text-emerald-600">Q2超预期潜力，看500亿</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">云南锗业</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">兑现</span></td>
                  <td className="px-4 py-3 text-slate-600">前期累计涨幅大</td>
                  <td className="px-4 py-3 text-red-600">跌破5日线止盈</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">汇绿生态</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">减仓</span></td>
                  <td className="px-4 py-3 text-slate-600">等收购方面眉目</td>
                  <td className="px-4 py-3 text-amber-600">建议减仓1/2</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">草甘膦</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">观察</span></td>
                  <td className="px-4 py-3 text-slate-600">五日均线朝下，与价格有点脱敏</td>
                  <td className="px-4 py-3 text-amber-600">再观察</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">商业航天</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">题材</span></td>
                  <td className="px-4 py-3 text-slate-600">4/28长十乙首飞，亚马逊入局，有企稳反弹迹象</td>
                  <td className="px-4 py-3 text-blue-600">可试探：臻镭科技、恒信移动、中国卫星</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 产业链逻辑 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🔗 产业链核心逻辑</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-700 mb-3">AIDC vs 算力租赁</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-emerald-600">AIDC</span> = 运营方/二手房东，配齐场地、液冷、配电、网络，真正赚商业模式的钱</p>
                <p><span className="font-medium text-red-600">算力租赁</span> = 买GPU卡租给AIDC（房东），赌token价格，不是可持续商业模式</p>
                <p className="text-red-500 font-medium mt-2">结论：AIDC才是可持续模式</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-700 mb-3">光模块三处预期差</h3>
              <ol className="space-y-2 text-slate-600 list-decimal list-inside">
                <li>1.6T需求爆发被低估</li>
                <li>价格战担忧过度</li>
                <li>CPO/3.2T商用进度滞后</li>
              </ol>
              <p className="text-slate-500 mt-2 text-xs">茂莱光学变相一季报预喜</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-700 mb-3">封测设备逻辑</h3>
              <p className="text-slate-600 mb-2">后道测试预期差最大</p>
              <p className="text-slate-600 mb-2">AI、先进封装推动设备需求</p>
              <p className="text-emerald-600 font-medium">关注: 长川科技、华峰测控、伟测科技</p>
            </div>
          </div>
        </div>

        {/* 重要资讯 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📰 重要资讯</h2>
          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-slate-600">• <strong>特斯拉AI5芯片流片</strong> - 世运电路供应Dojo服务器PCB</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-slate-600">• <strong>阿里云上调MU服务价格</strong> - Token紧缺+价值量提高趋势</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-slate-600">• <strong>Deepseek V4即将发布</strong> - 国产算力昇腾链+算力租赁受益</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-slate-600">• <strong>谷歌液冷链</strong> - 4-5月是0-1最舒服阶段，首批液冷交付</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-slate-600">• <strong>亚马逊入局商业航天</strong> - 4/28长十乙首飞</p>
            </div>
          </div>
        </div>

        {/* 操作提醒 */}
        <div className="bg-amber-50 rounded-xl p-4 text-sm">
          <h3 className="font-bold text-amber-700 mb-2">📝 操作提醒</h3>
          <ul className="space-y-1 text-amber-600">
            <li>• 涪陵电力：低位，等资金高切低</li>
            <li>• 上能电气：看逻辑和成本</li>
            <li>• 华丰科技：昇腾线，耐心等基本面节奏</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
