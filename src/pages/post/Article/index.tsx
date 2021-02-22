import { PostService } from '@/services';
import type { Responses } from '@/services/response';
import { ExclamationCircleOutlined, LikeOutlined, MessageFilled } from '@ant-design/icons';
import type { ApolloError } from '@apollo/client';
import { Button, Card, Image, List, message, Modal, Skeleton, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import React from 'react';
import { Link } from 'umi';
import styles from './index.less';

export type ApplicationsProps = {
  data: Responses.PostItemList;
  onIconLikeClick?: () => void;
  listComments: Responses.CommentItem[];
  initLoadingComment: boolean;
  loadingComment: boolean;
  onLoadMoreComment: () => void;
  skipComment: number;
  onReloadComment: () => void;
};

const Article: React.FC<ApplicationsProps> = ({
  skipComment,
  data,
  onIconLikeClick,
  listComments,
  initLoadingComment,
  loadingComment,
  onLoadMoreComment,
  onReloadComment,
}) => {
  const handleDeleteComment = (comment: Responses.CommentItem) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn xóa comment này ko?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        PostService.deleteComment({
          id: comment.id,
        })
          .then(() => {
            message.success('Xóa comment thành công');
            onReloadComment();
          })
          .catch((error: ApolloError) => {
            message.error(error.message);
          });
      },
    });
  };

  const loadMore =
    !initLoadingComment && !loadingComment ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          onClick={() => {
            onLoadMoreComment();
          }}
        >
          loading more
        </Button>
      </div>
    ) : null;
  return (
    <div className={styles.wrapper}>
      <Card
        className={styles.body}
        bodyStyle={{ paddingBottom: 20 }}
        actions={[
          <Tooltip key="like" title="like">
            <span
              onClick={() => {
                if (onIconLikeClick) {
                  onIconLikeClick();
                }
              }}
            >
              <LikeOutlined /> {data.likeCount}
            </span>
          </Tooltip>,
          <Tooltip title="comment" key="comment">
            <span>
              <MessageFilled /> {data.commentCount}
            </span>
          </Tooltip>,
        ]}
        style={{ background: `#${data.category.color}` }}
      >
        <Card.Meta
          avatar={
            data.createdBy.data.avatar ? (
              <Avatar src={data.createdBy.data.avatar.thumbnail} />
            ) : null
          }
          title={
            <div>
              <strong>
                #{data.id} &#9827; {data.category.value}
              </strong>
              <br />
              <Link to={`/users?id=${data.createdBy.id}`}>{data.createdBy.data.nickName}</Link> đăng
              lên <em>{moment(data.createdAt).format('YYYY-MM-DD HH:mm')}</em>
            </div>
          }
          description={<span></span>}
        />
        <div className={styles.cardItemContent}>
          <div className={styles.content}>{data.content}</div>
          {data.images.length > 0 ? (
            <Image.PreviewGroup>
              {data.images.map((image) => (
                <Image width={200} src={image.url} />
              ))}
            </Image.PreviewGroup>
          ) : null}
        </div>
      </Card>
      <List<Responses.CommentItem>
        loading={initLoadingComment || loadingComment}
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="horizontal"
        dataSource={listComments}
        loadMore={skipComment <= data.commentCount ? loadMore : undefined}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-more"
                onClick={() => {
                  handleDeleteComment(item);
                }}
              >
                delete
              </a>,
            ]}
            key={item.id}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  item.createdBy.data.avatar ? (
                    <Avatar src={item.createdBy.data.avatar.thumbnail} />
                  ) : null
                }
                title={
                  <Link to={`/users?id=${item.createdBy.id}`}>{item.createdBy.data.nickName}</Link>
                }
                description={item.content}
              />
            </Skeleton>
            <div>
              <em>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</em>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Article;
