import React, {useEffect} from "react";
import {Alert, Box, Card, ListItem, ListItemText, Skeleton, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectArticleError, selectArticleList, selectArticleLoading} from "../../store/Home/selectors";
import {getArticle} from "../../store/Home/actions";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

export const Article = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticleList);
    const isLoading = useSelector(selectArticleLoading);
    const error = useSelector(selectArticleError);
    const getRequest = async () => {
        dispatch(getArticle())
    }
    useEffect(() => {
        getRequest();
    }, []);
    return <>
        <Card sx={{minWidth: 275}}>
            <Typography variant="h3" gutterBottom component="div">
                Article
            </Typography>
            {isLoading ? (<Box>
                <Skeleton/>
                <Skeleton animation="wave"/>
                <Skeleton animation={false}/>
            </Box>) : <>
                <Button onClick={getRequest} variant="outlined">Обновить</Button>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {!!error && <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error">{error}</Alert>
                    </Stack>}
                    {articles.map((art) => (
                        <ListItem key={art.id} alignItems="flex-start">
                            <ListItemText
                                primary={art.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{display: 'inline'}}
                                            component="span"
                                            variant="body2"
                                            color="text.primary">

                                        </Typography>
                                        {art.summary}
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Источник: {art.newsSite}
                                        </Typography>
                                        <Typography variant="overline" display="block" gutterBottom>
                                            {art.publishedAt}
                                        </Typography>

                                    </React.Fragment>
                                }
                            />
                        </ListItem>

                    ))}
                </List>

            </>}
        </Card>
    </>;

}
