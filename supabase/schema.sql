-- 物件テーブル(Supabaseの SQL Editor に貼り付けて実行する)
create table if not exists public.properties (
  id         uuid primary key default gen_random_uuid(),
  -- 登録したユーザー。INSERT時は未指定でもログイン中のユーザーIDが自動で入る
  user_id    uuid not null default auth.uid()
             references auth.users (id) on delete cascade,
  name       text not null,                          -- 物件名
  rent       integer not null check (rent >= 0),     -- 家賃(円)
  area       text not null,                          -- エリア名
  layout     text not null,                          -- 間取り(例: 1LDK)
  created_at timestamptz not null default now()
);

-- 自分の物件を絞り込む検索を速くする
create index if not exists properties_user_id_idx on public.properties (user_id);

-- RLS(行レベルセキュリティ)を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ表示できる
create policy "自分の物件のみ表示"
  on public.properties for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- 自分のユーザーIDでのみ登録できる
create policy "自分の物件のみ登録"
  on public.properties for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- 自分の物件のみ編集できる(user_idを他人に書き換えることも不可)
create policy "自分の物件のみ編集"
  on public.properties for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- 自分の物件のみ削除できる
create policy "自分の物件のみ削除"
  on public.properties for delete
  to authenticated
  using ((select auth.uid()) = user_id);
