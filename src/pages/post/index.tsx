import { PostCategoryService, PostService } from '@/services';
import type { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ApolloError } from '@apollo/client';
import { Avatar, Button, Drawer, List, message, Modal, Skeleton } from 'antd';
import type { SortOrder } from 'antd/lib/table/interface';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import Article from './Article';

const defaultTakeComment = 10;
const Post: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [listPostCategories, setListPostCategories] = useState<Responses.PostCategoryItem[]>([]);
  const [row, setRow] = useState<Responses.PostItemList>();

  const [listComments, setListComments] = useState<Responses.CommentItem[]>([]);
  const [skipComment, setSkipComment] = useState<number>(0);
  const [initLoadingComment, setInitLoadingComment] = useState<boolean>(false);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);

  const [listUserLiked, setListUserLiked] = useState<Responses.UserLikedPostItem[]>([]);
  const [skipUserLiked, setSkipUserLiked] = useState<number>(0);
  const [initLoadingUserLiked, setInitLoadingUserLiked] = useState<boolean>(false);
  const [loadingUserLiked, setLoadingUserLiked] = useState<boolean>(false);

  const onLoadMoreUserLiked = () => {
    if (row && listUserLiked.length < row.likeCount) {
      if (listUserLiked.length === 0) {
        setInitLoadingUserLiked(true);
      }
      setLoadingUserLiked(true);
      PostService.getUserLikedPost({
        id: row.id,
        skip: skipUserLiked,
        take: defaultTakeComment,
      }).then((data) => {
        setListUserLiked([...listUserLiked, ...data]);
        setSkipUserLiked(skipUserLiked + defaultTakeComment);
        setLoadingUserLiked(false);
        setInitLoadingUserLiked(false);
      });
    }
  };

  const loadMoreUserLiked =
    !initLoadingUserLiked && !loadingUserLiked ? (
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
            onLoadMoreUserLiked();
          }}
        >
          loading more
        </Button>
      </div>
    ) : null;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalUserLiked = () => {
    setIsModalVisible(true);
    onLoadMoreUserLiked();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeletePost = (post: Responses.PostItemList) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn xóa post này ko?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        PostService.deletePost({
          id: post.id,
        })
          .then(() => {
            message.success('Xóa bài viết thành công');
            actionRef.current?.reload();
          })
          .catch((error: ApolloError) => {
            message.error(error.message);
          });
      },
    });
  };
  const loadDataPostCategory = () => {
    PostCategoryService.getListPostCategory()
      .then((res) => {
        if (res.data) {
          setListPostCategories(res.data.postCategories);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  const onLoad = (entity: Responses.PostItemList) => {
    setInitLoadingComment(true);
    setListComments([]);
    setRow(entity);
    setSkipComment(0);
    setSkipUserLiked(0);
    setListUserLiked([]);
    setLoadingComment(true);
    PostService.getCommentsPost({
      id: entity.id,
      take: defaultTakeComment,
      skip: 0,
    }).then((data) => {
      setListComments(data);
      setSkipComment(defaultTakeComment);
      setInitLoadingComment(false);
      setLoadingComment(false);
    });
  };

  const onLoadMoreComment = () => {
    if (row && skipComment < row.commentCount) {
      setLoadingComment(true);
      PostService.getCommentsPost({
        id: row.id,
        take: defaultTakeComment,
        skip: skipComment,
      }).then((data) => {
        setListComments([...listComments, ...data]);
        setSkipComment(skipComment + defaultTakeComment);
        setLoadingComment(false);
      });
    }
  };

  const onReloadComment = () => {
    if (row) {
      actionRef.current?.reload();
      // setRow(undefined);
      setInitLoadingComment(true);
      setListComments([]);
      setSkipComment(0);
      PostService.getCommentsPost({
        id: row.id,
        take: defaultTakeComment,
        skip: 0,
      }).then((data) => {
        setListComments(data);
        setSkipComment(defaultTakeComment);
        setInitLoadingComment(false);
      });
    }
  };

  const columns: ProColumns<Responses.PostItemList>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Rule name is required',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => onLoad(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
      render: (dom, entity) => {
        return (
          <span
            style={{
              backgroundColor: `#${entity.category.color}`,
            }}
          >
            {entity.category.value}
          </span>
        );
      },
      hideInForm: true,
      // valueType: 'select',
      // valueEnum: {
      //   enabled: { text: 'enabled', status: 'enabled' },
      //   disabled: {
      //     text: 'disabled',
      //     status: 'disabled',
      //   },
      // },
    },
    {
      title: 'Author',
      dataIndex: 'createdBy',
      tip: 'Search by nickName',
      sorter: true,
      render: (dom, entity) => {
        return (
          <Link to={`/users?id=${entity.createdBy.id}`}>{entity.createdBy.data.nickName}</Link>
        );
      },
    },
    {
      title: 'Comment Count',
      dataIndex: 'commentCount',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'Like Count',
      dataIndex: 'likeCount',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      sortOrder: 'descend',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (_, entity) => (
        <>
          <a
            onClick={() => {
              handleDeletePost(entity);
            }}
          >
            Delete Post
          </a>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadDataPostCategory();
  }, []);

  const queryListPost = async (
    params: any & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    console.log(params, sort, filter);

    const res = await PostService.getListPosts(params, sort);
    return res;
  };

  return (
    <PageContainer>
      <ProTable<Responses.PostItemList>
        headerTitle="List Posts"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => queryListPost(params, sort, filter)}
        columns={columns}
      />
      <Drawer
        width={1000}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row ? (
          <Article
            onReloadComment={onReloadComment}
            listComments={listComments}
            skipComment={skipComment}
            data={row}
            initLoadingComment={initLoadingComment}
            loadingComment={loadingComment}
            onLoadMoreComment={onLoadMoreComment}
            onIconLikeClick={showModalUserLiked}
          />
        ) : null}
      </Drawer>
      <Modal
        title={`Users Liked Post #${row?.id}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List
          loading={initLoadingUserLiked}
          itemLayout="horizontal"
          loadMore={row && listUserLiked.length < row.likeCount ? loadMoreUserLiked : null}
          dataSource={listUserLiked}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    item.user.data.avatar ? <Avatar src={item.user.data.avatar.thumbnail} /> : null
                  }
                  title={<Link to={`/users?id=${item.user.id}`}>{item.user.data.nickName}</Link>}
                  description={<em>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</em>}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Modal>
    </PageContainer>
  );
};

export default Post;
