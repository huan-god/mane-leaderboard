# 鬃毛邮报 · 调查积分榜

重返未来：1999 的独立社区排行榜。4.1 地图分为鉴藏者特版三张新图和目击者特版往期首领，各自按地图、塑造分组和配队记录最高调查积分。

仅设全 0 塑造和全满塑造。主 C 总分榜按角色取各图最高审核通过积分再相加，单图只保留该主 C 的最高分配队。共同主 C 各自计分，新图与复刻各自计分。

- 新图名单与排期见[鉴藏者特版](https://res1999.huijiwiki.com/wiki/鬃毛邮报4.1)。
- 复刻目录按 [Wiki 3.2 以后往期调查对象](https://res1999.huijiwiki.com/wiki/鬃毛邮报)整理，实际挑战资格以游戏内怪相档案为准。
- Supabase 共用现有的账号和三位管理员的授权，排行榜数据使用独立的 `mane_*` 表和 `mane-proofs` 私有桶。将 `001_mane_leaderboard.sql` 至 `003_mane_carry_total_leaderboard.sql` 依次应用到现有 Supabase 项目后，由 GitHub Pages 从 `main` 根目录发布。
- 管理员收取既有 Supabase 账号的邮件登录链接。同一站点域名下两个站共享会话。邮箱回跳地址由 Supabase Auth 的许可列表决定。
